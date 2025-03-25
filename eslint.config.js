import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'unused-imports': unusedImports,
      'sort-keys-fix': sortKeysFix,
      'simple-import-sort': simpleImportSort,
      // Removed the redundant "@typescript-eslint" plugin entry.
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Additional rules:
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports-ts': 'warn',
      'unused-imports/no-unused-vars-ts': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'sort-keys-fix/sort-keys-fix': [
        'warn',
        'asc',
        {
          caseSensitive: true,
          natural: true,
        },
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^react$', '^[a-z]', '^@'],
            ['^@/'],
            ['^~'],
            ['^\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ['^.+\\.s?css$'],
            ['^\\u0000'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
      'prefer-arrow-callback': 'warn',
      'arrow-body-style': 'warn',
      eqeqeq: 'warn',
      'no-implicit-coercion': 'warn',
      'no-return-await': 'warn',
    },
  },
);
