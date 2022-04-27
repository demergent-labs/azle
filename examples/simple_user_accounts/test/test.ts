import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call simple_user_accounts getUserById '("0")'`,
        expectedOutputBash: `echo "(null)"`
    },
    {
        bash: `dfx canister call simple_user_accounts getAllUsers`,
        expectedOutputBash: `echo "(vec {})"`
    },
    {
        bash: `dfx canister call simple_user_accounts createUser '("lastmjs")'`,
        expectedOutputBash: `echo "(record { id = \\"0\\"; username = \\"lastmjs\\" })"`
    },
    {
        bash: `dfx canister call simple_user_accounts getUserById '("0")'`,
        expectedOutputBash: `echo "(opt record { id = \\"0\\"; username = \\"lastmjs\\" })"`
    },
    {
        bash: `dfx canister call simple_user_accounts getAllUsers`,
        expectedOutputBash: `echo "(vec { record { id = \\"0\\"; username = \\"lastmjs\\" } })"`
    }
];

run_tests(tests);