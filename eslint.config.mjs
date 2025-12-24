import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'prettier/prettier': ['error'],
      'no-var': 'error',
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
