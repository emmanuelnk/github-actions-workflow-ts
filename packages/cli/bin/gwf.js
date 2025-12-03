#!/usr/bin/env node
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Path to the actual CLI entry point
const cliPath = join(__dirname, '..', 'dist', 'bin.js')

// Path to tsx in our own node_modules
const tsxPath = join(__dirname, '..', 'node_modules', '.bin', 'tsx')

// Spawn tsx with the CLI script and pass through all arguments
const child = spawn(tsxPath, [cliPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
})

child.on('close', (code) => {
  process.exit(code ?? 0)
})
