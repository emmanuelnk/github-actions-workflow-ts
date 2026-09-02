import { promises as fs } from 'fs'
import * as path from 'path'
import fetch from 'node-fetch'
import { compile, type JSONSchema } from 'json-schema-to-typescript'

const GITHUB_ACTIONS_WORKFLOW_JSON_SCHEMA_URL =
  'https://raw.githubusercontent.com/SchemaStore/schemastore/refs/heads/master/src/schemas/json/github-workflow.json'

/**
 * Converts a snake_case event name to PascalCase
 * e.g., "branch_protection_rule" -> "BranchProtectionRule"
 */
function toPascalCase(str: string): string {
  return str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

/**
 * True if the node is a lone single-element allOf wrapper around the given $ref,
 * i.e. { allOf: [{ $ref }] } (the schema moved refs into allOf wrappers).
 */
function hasSingleAllOfRef(node: JSONSchema, ref: string): boolean {
  return (
    Array.isArray(node.allOf) &&
    node.allOf.length === 1 &&
    node.allOf[0]?.$ref === ref &&
    Object.keys(node.allOf[0]).length === 1
  )
}

/**
 * json-schema-to-typescript drops sibling keywords next to allOf, so unwrap
 * { allOf: [{ $ref }], ...siblings } back to { $ref, ...siblings } which it
 * compiles as an intersection.
 */
function unwrapAllOfRef(node: JSONSchema, ref: string): void {
  if (hasSingleAllOfRef(node, ref)) {
    node.$ref = ref
    delete node.allOf
  }
}

/**
 * Names a `types` activity-types node (direct or allOf-wrapped ref to
 * #/definitions/types) so it compiles as `<Pascal>EventTypes`.
 */
function addTitleToTypesNode(
  typesNode: JSONSchema | undefined,
  pascalEventName: string,
): void {
  if (
    typeof typesNode !== 'object' ||
    typesNode === null ||
    Array.isArray(typesNode)
  ) {
    return
  }

  unwrapAllOfRef(typesNode, '#/definitions/types')

  if (typesNode.$ref === '#/definitions/types') {
    typesNode.title = `${pascalEventName}EventTypes`
  }
}

/**
 * Pre-processes the JSON schema to add title properties to inline event schemas.
 * This gives json-schema-to-typescript meaningful names instead of EventObject1, Types2, etc.
 */
function addTitlesToEventSchemas(schema: JSONSchema): JSONSchema {
  const onProperty = schema.properties?.on
  if (!onProperty || !Array.isArray(onProperty.oneOf)) {
    return schema
  }

  // The third oneOf option (index 2) contains the detailed event object definitions
  const eventObjectDef = onProperty.oneOf[2]
  if (!eventObjectDef?.properties) {
    return schema
  }

  for (const [eventName, eventSchema] of Object.entries(
    eventObjectDef.properties,
  )) {
    if (
      typeof eventSchema !== 'object' ||
      eventSchema === null ||
      Array.isArray(eventSchema)
    ) {
      continue
    }

    const pascalEventName = toPascalCase(eventName)

    // Events referencing eventObject, either directly or via an allOf wrapper
    if (
      eventSchema.$ref === '#/definitions/eventObject' ||
      hasSingleAllOfRef(eventSchema, '#/definitions/eventObject')
    ) {
      if (eventSchema.properties?.types) {
        // The event carries its own activity-types enum alongside the
        // eventObject ref. json-schema-to-typescript drops sibling properties
        // next to allOf, so inline eventObject (object | null) as a oneOf
        // carrying the event's own properties.
        addTitleToTypesNode(eventSchema.properties.types, pascalEventName)
        eventSchema.title = `${pascalEventName}Event`
        eventSchema.oneOf = [
          {
            type: 'object',
            properties: eventSchema.properties,
            additionalProperties: true,
          },
          { type: 'null' },
        ]
        delete eventSchema.allOf
        delete eventSchema.$ref
        delete eventSchema.properties
      } else {
        unwrapAllOfRef(eventSchema, '#/definitions/eventObject')
        eventSchema.title = `${pascalEventName}Event`
      }
    }

    // Direct types property (events not referencing eventObject)
    addTitleToTypesNode(eventSchema.properties?.types, pascalEventName)

    // `types` may live inside a oneOf branch, either directly
    // (eventObject events: oneOf [null, { properties: { types } }]) or under
    // oneOf > allOf (pull_request, pull_request_target, push)
    if (Array.isArray(eventSchema.oneOf)) {
      for (const oneOfItem of eventSchema.oneOf) {
        addTitleToTypesNode(oneOfItem?.properties?.types, pascalEventName)
        if (Array.isArray(oneOfItem?.allOf)) {
          for (const allOfItem of oneOfItem.allOf) {
            addTitleToTypesNode(allOfItem?.properties?.types, pascalEventName)
          }
        }
      }
    }
  }

  return schema
}

/**
 * workflowDispatchInput.default is constrained per input `type` via if/then
 * conditionals, which json-schema-to-typescript cannot express — it compiles
 * to { [k: string]: unknown }. Pin the union of values the conditionals allow
 * (string | number | boolean), mirroring how workflow_call inputs declare it.
 */
function constrainWorkflowDispatchInputDefault(schema: JSONSchema): void {
  const defaultProp =
    schema.definitions?.workflowDispatchInput?.properties?.default
  if (
    typeof defaultProp === 'object' &&
    defaultProp !== null &&
    defaultProp.type === undefined
  ) {
    defaultProp.type = ['string', 'number', 'boolean']
  }
}

;(async () => {
  const jsonSchema = await fetch(GITHUB_ACTIONS_WORKFLOW_JSON_SCHEMA_URL).then(
    (response) => response.json(),
  )

  // Add titles to inline event schemas for better type names
  const processedSchema = addTitlesToEventSchemas(jsonSchema as JSONSchema)
  constrainWorkflowDispatchInputDefault(processedSchema)

  const outputPath = path.join(
    process.cwd(),
    'packages',
    'lib',
    'src',
    'types',
    'githubActionsWorkflow.ts',
  )

  let workflowTypes = await compile(processedSchema as JSONSchema, 'Workflow', {
    bannerComment: `
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */
`,
    customName: (schema, keyNameFromDefinition) => {
      if (schema.$id === 'https://json.schemastore.org/github-workflow.json')
        return 'Workflow'
      return keyNameFromDefinition
    },
  })

  // Remove @minItems JSDoc tags that aren't valid and cause typedoc warnings
  workflowTypes = workflowTypes.replace(/^\s*\*\s*@minItems\s+\d+\s*\n/gm, '')

  await fs.writeFile(outputPath, workflowTypes)
})()
