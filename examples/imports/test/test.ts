import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/imports';

const imports_canister = createActor(
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
        bash: `dfx canister call imports getOne`,
        expectedOutputBash: `echo "(\\"one\\")"`
    },
    {
        bash: `dfx canister call imports getTwo`,
        expectedOutputBash: `echo "(\\"two\\")"`
    },
    {
        bash: `dfx canister call imports getThree`,
        expectedOutputBash: `echo "(\\"three\\")"`
    },
    {
        bash: `dfx canister call imports sha224Hash '("hello")'`,
        expectedOutputBash: `echo "(\\"ea09ae9cc6768c50fcee903ed054556e5bfc8347907f12598aa24193\\")"`
    }
];

run_tests(tests);