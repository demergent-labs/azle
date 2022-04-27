import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code pre_and_post_upgrade || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call pre_and_post_upgrade getEntries`,
        expectedOutputBash: `echo "(vec {})"`
    },
    {
        bash: `dfx canister call pre_and_post_upgrade setEntry '(record { key = "0"; value = 0 })'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call pre_and_post_upgrade getEntries`,
        expectedOutputBash: `echo "(vec { record { key = \\"0\\"; value = 0 : nat64 } })"`
    }
];

run_tests(tests);