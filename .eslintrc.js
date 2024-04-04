// TODO: These rules should be enabled, but we had offenses when we enabled ESLint.
// This is tech-debt. We should go through and re-enable these at some point.
const temporarilyDisabledRules = {
    '@typescript-eslint/ban-ts-comment': 'off', // 42 problems
    '@typescript-eslint/no-explicit-any': 'off', // 537 problems
    '@typescript-eslint/no-unused-vars': [
        'off',
        {
            argsIgnorePattern: '^_', // Ignore argument variables starting with _
            varsIgnorePattern: '^_' // Ignore local variables starting with _
        }
    ], // 26 problems
    '@typescript-eslint/no-var-requires': 'off', // 14 problems
    'no-constant-condition': 'off', // 1 problem
    'no-undef': 'off', // 79 problems
    'prefer-const': 'off' // 154 problems
};

module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    rules: {
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
        'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
        'array-callback-return': 'error',
        'no-template-curly-in-string': 'error',
        'prefer-template': 'error',
        eqeqeq: 'error',
        ...temporarilyDisabledRules
    }
};
