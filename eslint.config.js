import js from '@eslint/js';
import tslintPlugin from '@typescript-eslint/eslint-plugin';
import tslintParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2024
            },
            parser: tslintParser,
            parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
        },
        files: ['**/*.js', '**/*.ts', '**/*.tsx'],
        plugins: {
            '@typescript-eslint': tslintPlugin,
            'jsx-a11y': jsxA11y,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tslintPlugin.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': 'warn',
            '@typescript-eslint/ban-ts-comment': 'off'
        }
    }
];
