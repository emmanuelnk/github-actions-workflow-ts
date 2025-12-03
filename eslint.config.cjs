const globals = require('globals');
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const prettierPlugin = require('eslint-plugin-prettier');
const eslintPluginJest = require('eslint-plugin-jest');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['**/dist/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      jest: eslintPluginJest,
    },
    rules: {
      'no-console': 'warn',
      'prettier/prettier': 'error',
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...eslintPluginJest.environments.globals.globals,
        ...globals.browser,
				...globals.node,
      },
    },
	},
];
