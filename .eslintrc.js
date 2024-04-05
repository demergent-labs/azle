// TODO: These rules should be enabled, but we had offenses when we enabled ESLint.
// This is tech-debt. We should go through and re-enable these at some point.
const temporarilyDisabledRules = {
    'consistent-return': 'off', // 5 problems
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/no-unsafe-return': 'off', // No any returned
    '@typescript-eslint/no-unsafe-argument': 'off', // No any passed as arguments
    '@typescript-eslint/no-unsafe-member-access': 'off', // No accessing members of any
    '@typescript-eslint/no-unsafe-call': 'off', // 27 errors No calling on any
    '@typescript-eslint/no-unsafe-assignment': 'off', // 73 errors Don't assign any to anything
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off' // 2 errors
};

module.exports = {
    env: {
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'prettier'
    ],
    overrides: [
        {
            env: {
                node: true
            },
            extends: ['plugin:@typescript-eslint/disable-type-checked'],
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
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
        'no-param-reassign': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        'prefer-arrow-callback': 'error',
        'no-var': 'error',
        '@typescript-eslint/strict-boolean-expressions': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        eqeqeq: 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_', // Ignore argument variables starting with _
                varsIgnorePattern: '^_' // Ignore local variables starting with _
            }
        ],
        '@typescript-eslint/ban-ts-comment': 'off',
        'prefer-const': 'off', // For azle let is used to indicate mutability not only re-assignability
        'no-undef': 'off', // TS compiler handles this for us
        '@typescript-eslint/no-explicit-any': 'off', // TODO https://github.com/demergent-labs/azle/issues/1737
        ...temporarilyDisabledRules
    }
};
