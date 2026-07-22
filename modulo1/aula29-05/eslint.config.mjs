import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintPluginImport from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

const config = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['*.js']
        },
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
      globals: {
        node: true,
      },
    },

    plugins: {
      import: eslintPluginImport,
      prettier: prettierPlugin,
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintPluginImport.configs.recommended.rules,
      ...eslintPluginImport.configs.typescript.rules,

      '@typescript-eslint/no-extraneous-class': ['off'],
      '@typescript-eslint/interface-name-prefix': 'off',
      'import/no-absolute-path': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'lines-between-class-members': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_',
          varsIgnorePattern: '_',
          caughtErrorsIgnorePattern: '_',
        },
      ],
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
);

export default config;