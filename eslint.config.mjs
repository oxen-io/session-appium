import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin'; // Correct import for TypeScript ESLint plugin
import parser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Include TypeScript files as well
    languageOptions: {
      parser, // Use TypeScript ESLint parser for parsing TypeScript code
      parserOptions: {
        project: './tsconfig.json', // Specify the path to your tsconfig.json file
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
    },
  },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs['recommended-requiring-type-checking'], // Add recommended-requiring-type-checking config
];
