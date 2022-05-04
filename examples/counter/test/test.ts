import { execSync } from 'child_process';
import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { createActor } from '../src/dfx_generated/counter';

const counter_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code counter || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call counter readCount`,
        expectedOutputBash: `echo "(0 : nat64)"`
    },
    {
        bash: `dfx canister call counter incrementCount`,
        expectedOutputBash: `echo "(1 : nat64)"`
    },
    {
        bash: `dfx canister call counter incrementCount`,
        expectedOutputBash: `echo "(2 : nat64)"`
    },
    {
        bash: `dfx canister call counter incrementCount`,
        expectedOutputBash: `echo "(3 : nat64)"`
    },
    {
        bash: `dfx canister call counter readCount`,
        expectedOutputBash: `echo "(3 : nat64)"`
    }
];

run_tests(tests);