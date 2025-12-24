import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintSimpleSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      // react: eslintReact,
      // 'react-hooks': eslintReactHooks,
      // 'simple-import-sort': eslintSimpleSort,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'eslint.config.js'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      // parserOptions: {
      //   project: ['./tsconfig.json'],
      // },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      // 'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',
      // 'no-unused-vars': 'warn',
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-hooks/exhaustive-deps': 'warn',
      // '@typescript-eslint/no-unused-vars': 'warn',
    },
  }
);
