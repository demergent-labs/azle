import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code heartbeat || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call heartbeat getInitialized`,
        expectedOutputBash: `echo "(true)"`,
        delay: 5000
    }
];

run_tests(tests);