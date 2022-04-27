import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call optional_types getHTML`,
        expectedOutputBash: `echo "(record { head = null })"`
    },
    {
        bash: `dfx canister call optional_types getHead`,
        expectedOutputBash: `echo "(opt record { elements = vec {} })"`
    },
    {
        bash: `dfx canister call optional_types getHeadWithElements`,
        expectedOutputBash: `echo "(opt record { elements = vec { record { id = \\"0\\" } } })"`
    },
    {
        bash: `dfx canister call optional_types getElement '(null)'`,
        expectedOutputBash: `echo "(null)"`
    },
    {
        bash: `dfx canister call optional_types getElement '(opt null)'`,
        expectedOutputBash: `echo "(null)"`
    },
    {
        bash: `dfx canister call optional_types getElement '(opt opt record { id = "0" })'`,
        expectedOutputBash: `echo "(opt opt record { id = \\"0\\" })"`
    }
];

run_tests(tests);