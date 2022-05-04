import { execSync } from 'child_process';
import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { createActor } from '../src/dfx_generated/ic_api';

const ic_api_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

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