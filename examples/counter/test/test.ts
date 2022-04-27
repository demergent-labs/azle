import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code counter || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call counter readCount`,
        expectedOutputBash: `echo "(0 : nat64)"`
    },
    {
        bash: `dfx canister call counter incrementCount`,
        expectedOutputBash: `echo "(1 : nat64)"`
    },
    {
        bash: `dfx canister call counter incrementCount`,
        expectedOutputBash: `echo "(2 : nat64)"`
    },
    {
        bash: `dfx canister call counter incrementCount`,
        expectedOutputBash: `echo "(3 : nat64)"`
    },
    {
        bash: `dfx canister call counter readCount`,
        expectedOutputBash: `echo "(3 : nat64)"`
    }
];

run_tests(tests);