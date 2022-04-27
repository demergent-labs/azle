import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call query query`,
        expectedOutputBash: `echo "(\\"This is a query function\\")"`
    }
];

run_tests(tests);