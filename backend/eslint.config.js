import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  {
    plugins: {
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,

      // prettier as an eslint error
      'prettier/prettier': 'error',

      // catch common bugs
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['error', 'warn', 'log'] }],
      'no-duplicate-imports': 'error',
      eqeqeq: ['error', 'always'],

      // import/order disabled — eslint-plugin-import not yet compatible with ESLint v10
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
  },
  {
    // ignore compiled output and dependencies
    ignores: ['node_modules/', 'dist/', 'build/', 'docs/'],
  },
];
