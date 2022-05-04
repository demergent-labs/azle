import { execSync } from 'child_process';
import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { createActor } from '../src/dfx_generated/heartbeat';

const heartbeat_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

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