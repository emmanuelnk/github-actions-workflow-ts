#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { generateWorkflowFiles } from './commands/build.js'

yargs(hideBin(process.argv))
  .scriptName('github-actions-workflow-ts')
  .usage('$0 <cmd> [args]')
  .command(
    'build',
    'Builds YAML from detected TypeScript ("*.wac.ts") workflow files.',
    {},
    async (argv) => {
      await generateWorkflowFiles(argv)
    },
  )
  .help()
  .parse()
