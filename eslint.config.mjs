import eslint from '@eslint/js';
import tseslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    prettier,
    {
        ignores: [
            'docs/**',
            'the_azle_book/**',
            'examples/stable/test/property/candid_rpc/**/src/**',
            'examples/experimental/test/property/candid_rpc/**/src/**',
            '**/.azle/**',
            '**/.dfx/**',
            '**/declarations/**',
            '**/dfx_generate/**',
            '**/dfx_generated/**',
            '**/dist/**',
            '**/node_modules/**',
            '**/run_time_errors/**',
            '**/target/**',
            '**/webpack.config.js',
            'src/build/stable/commands/generate_types/rust/candid_to_ts_js/pkg',
            'canisters/**/idl/*'
        ]
    },
    {
        files: ['**/*.{js,mjs,cjs,ts}'],
        languageOptions: {
            parser: tseslintParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            }
        },
        plugins: {
            'simple-import-sort': simpleImportSort
        },
        rules: {
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': 'error',
            'func-style': [
                'error',
                'declaration',
                { allowArrowFunctions: true }
            ],
            'array-callback-return': 'error',
            'no-template-curly-in-string': 'error',
            'prefer-template': 'error',
            'no-param-reassign': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            'prefer-arrow-callback': 'error',
            'no-var': 'error',
            '@typescript-eslint/explicit-function-return-type': ['error'],
            eqeqeq: 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_'
                }
            ],
            '@typescript-eslint/ban-ts-comment': 'off',
            'prefer-const': 'off', // For azle let is used to indicate mutability not only re-assignability
            'no-undef': 'off', // TS compiler handles this for us
            '@typescript-eslint/no-explicit-any': 'off' // TODO https://github.com/demergent-labs/azle/issues/1737
        }
    }
);
