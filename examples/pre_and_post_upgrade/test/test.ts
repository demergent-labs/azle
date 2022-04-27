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
    },
    {
        // TODO Get rid of this once https://forum.dfinity.org/t/upgrade-a-canister-even-if-the-wasm-module-hash-has-not-changed/11989
        bash: 'echo "\\n\\nexport function hack(): Query<void> {}" >> src/pre_and_post_upgrade.ts'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call pre_and_post_upgrade getEntries`,
        expectedOutputBash: `echo "(vec { record { key = \\"0\\"; value = 0 : nat64 } })"`
    }
];

run_tests(tests);