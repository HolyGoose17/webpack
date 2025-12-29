import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintSimpleSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
  {
    plugins: {
      react: eslintReact,
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'simple-import-sort': eslintSimpleSort,
      prettier: prettierPlugin,
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      ...eslintReact.configs.recommended.rules,
      ...eslintReactHooks.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      'react/react-in-jsx-scope': 'off',

      "react/no-unescaped-entities": "off",

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
);
