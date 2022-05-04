import { execSync } from 'child_process';
import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { createActor } from '../src/dfx_generated/generators';

const generators_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [];

run_tests(tests);