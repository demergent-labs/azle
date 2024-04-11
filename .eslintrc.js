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
        'no-param-reassign': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        'prefer-arrow-callback': 'error',
        'no-var': 'error',
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
        '@typescript-eslint/no-explicit-any': 'off' // TODO https://github.com/demergent-labs/azle/issues/1737
    }
};
