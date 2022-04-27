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
        bash: `dfx canister call counter get`,
        expectedOutputBash: `echo "(0 : nat64)"`
    },
    {
        bash: `dfx canister call counter set '(10)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call counter inc`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call counter inc`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call counter get`,
        expectedOutputBash: `echo "(12 : nat64)"`
    }
];

run_tests(tests);