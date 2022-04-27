import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call ic_api canisterBalance`,
        expectedOutputBash: `echo "(4_000_000_000_000 : nat64)"`
    },
    {
        bash: `dfx canister call ic_api id`,
        expectedOutputBash: `echo "(principal \\"$(dfx canister id ic_api)\\")"`
    },
    {
        bash: `dfx canister call ic_api print '("Hello World!")'`,
        expectedOutputBash: `echo "(true)"`
    }
];

run_tests(tests);