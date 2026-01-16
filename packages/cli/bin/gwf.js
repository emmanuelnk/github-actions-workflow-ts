#!/usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Path to the actual CLI entry point
const cliPath = join(__dirname, '..', 'dist', 'bin.js')

// Use Node's module resolution to find tsx, which handles hoisted dependencies correctly
const require = createRequire(import.meta.url)
const tsxPath = require.resolve('tsx/cli')

// Spawn node with tsx CLI to run the script and pass through all arguments
const child = spawn(process.execPath, [tsxPath, cliPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

child.on('close', (code) => {
  process.exit(code ?? 0)
})
