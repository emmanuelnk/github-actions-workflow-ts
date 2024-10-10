#!/usr/bin/env node
/* istanbul ignore file */
import * as yargs from 'yargs'
import { registerTsNode, generateWorkflowFiles } from './commands/build'

yargs
	.scriptName('github-actions-wac')
	.usage('$0 <cmd> [args]')
	.command(
		'build',
		`Builds YAML from detected TypeScript ("*.wac.ts") workflow files.`,
		{},
		async (argv) => {
			registerTsNode()
			generateWorkflowFiles(argv)
		},
	)
	.help().argv
