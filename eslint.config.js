import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.es2024
        },
        parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }
    },
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    plugins: {
        'jsx-a11y': jsxA11y,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh
    },
    rules: {
        ...jsxA11y.configs.recommended.rules,
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off'
    }
});
