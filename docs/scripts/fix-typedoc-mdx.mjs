#!/usr/bin/env node
/**
 * Post-processes TypeDoc-generated markdown files to escape angle brackets
 * that would otherwise be interpreted as JSX tags by MDX.
 *
 * This script finds patterns like <job_id>, <input_id>, etc. in the generated
 * markdown and escapes them as &lt;tag&gt; HTML entities.
 */

import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const API_REFERENCE_DIR = join(import.meta.dirname, '../docs/api-reference')

/**
 * Escape angle bracket patterns that look like JSX tags.
 * Matches <word> patterns (lowercase letters, numbers, underscores).
 * Replaces them with HTML entities &lt;word&gt;
 */
function escapeAngleBrackets(content) {
  // Match <word> patterns - these look like JSX tags to MDX
  // Includes patterns like <job_id>, <input_id>, <envName>, <ifTrue>, etc.
  const ANGLE_BRACKET_PATTERN = /<([a-z][a-z0-9_]*)>/gi

  return content.replace(ANGLE_BRACKET_PATTERN, (match, tagName) => {
    // Don't escape actual HTML tags that MDX should process
    const htmlTags = [
      'a',
      'abbr',
      'address',
      'article',
      'aside',
      'b',
      'blockquote',
      'br',
      'button',
      'caption',
      'cite',
      'code',
      'col',
      'colgroup',
      'data',
      'dd',
      'del',
      'details',
      'dfn',
      'div',
      'dl',
      'dt',
      'em',
      'fieldset',
      'figcaption',
      'figure',
      'footer',
      'form',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hr',
      'html',
      'i',
      'iframe',
      'img',
      'input',
      'ins',
      'kbd',
      'label',
      'legend',
      'li',
      'link',
      'main',
      'map',
      'mark',
      'meta',
      'nav',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'pre',
      'q',
      's',
      'samp',
      'script',
      'section',
      'select',
      'small',
      'source',
      'span',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'table',
      'tbody',
      'td',
      'template',
      'textarea',
      'tfoot',
      'th',
      'thead',
      'time',
      'title',
      'tr',
      'track',
      'u',
      'ul',
      'var',
      'video',
      'wbr',
    ]

    if (htmlTags.includes(tagName.toLowerCase())) {
      return match // Keep actual HTML tags
    }

    return `&lt;${tagName}&gt;`
  })
}

async function processFile(filePath) {
  const content = await readFile(filePath, 'utf-8')

  const fixed = escapeAngleBrackets(content)

  if (fixed !== content) {
    await writeFile(filePath, fixed, 'utf-8')
    console.log(`Fixed: ${filePath}`)
    return true
  }
  return false
}

async function processDirectory(dirPath) {
  let fixedCount = 0

  try {
    const entries = await readdir(dirPath)

    for (const entry of entries) {
      const fullPath = join(dirPath, entry)
      const stats = await stat(fullPath)

      if (stats.isDirectory()) {
        fixedCount += await processDirectory(fullPath)
      } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
        if (await processFile(fullPath)) {
          fixedCount++
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
    // Directory doesn't exist yet, that's OK
  }

  return fixedCount
}

async function main() {
  console.log('Fixing TypeDoc MDX compatibility issues...')
  const fixedCount = await processDirectory(API_REFERENCE_DIR)
  console.log(`Done. Fixed ${fixedCount} files.`)
}

main().catch(console.error)
