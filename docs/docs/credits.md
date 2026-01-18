---
sidebar_position: 100
title: Credits
description: Acknowledgements and inspiration for github-actions-workflow-ts
---

# Credits

This project was inspired by [webiny/github-actions-wac](https://github.com/webiny/github-actions-wac), which is also the original source of the filename extension (`.wac.ts`) used to distinguish GitHub Actions workflow TypeScript files.

When I hit too many limitations with `github-actions-wac`, I decided to create `github-actions-workflow-ts` to address those limitations and add more functionality, including:

- Full TypeScript support with auto-generated types from the official GitHub Actions schema
- A dedicated CLI tool for building and watching workflow files
- Pre-built typed action wrappers for popular GitHub Actions
- Zero runtime dependencies in the core library
- Support for both ESM and CommonJS projects

A big thank you to the Webiny team for the initial inspiration!
