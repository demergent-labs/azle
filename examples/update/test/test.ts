import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call update update '("Why hello there")'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call update query`,
        expectedOutputBash: `echo "(\\"Why hello there\\")"`
    }
];

run_tests(tests);