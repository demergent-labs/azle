// TODO: These rules should be enabled, but we had offenses when we enabled ESLint.
// This is tech-debt. We should go through and re-enable these at some point.
const temporarilyDisabledRules = {
    '@typescript-eslint/ban-ts-comment': 'off', // 39 problems
    '@typescript-eslint/no-explicit-any': 'off', // 321 problems
    '@typescript-eslint/no-unused-vars': 'off', // 33 problems
    '@typescript-eslint/no-var-requires': 'off', // 12 problems
    '@typescript-eslint/prefer-as-const': 'off', // 45 problems
    'no-constant-condition': 'off', // 1 problem
    'no-empty': 'off', // 9 problems
    'no-undef': 'off', // 11 problems
    'no-var': 'off', // 6 problems
    'prefer-const': 'off' // 137 problems
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
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' }
        ],
        ...temporarilyDisabledRules
    }
};
