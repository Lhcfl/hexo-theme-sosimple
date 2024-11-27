import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.commonjs,
        hexo: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  {
    ignores: ['node_modules', '**/*.min.js', '**/bundle.*'],
  },
];
