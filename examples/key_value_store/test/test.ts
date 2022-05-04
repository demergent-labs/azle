import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { execSync } from 'child_process';
import { createActor } from '../test/dfx_generated/key_value_store';

const key_value_store_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code key_value_store || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call key_value_store get '("0")'`,
        expectedOutputBash: `echo "(null)"`
    },
    {
        bash: `dfx canister call key_value_store get '("1")'`,
        expectedOutputBash: `echo "(null)"`
    },
    {
        bash: `dfx canister call key_value_store set '("0", "zero")'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call key_value_store set '("1", "one")'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call key_value_store get '("0")'`,
        expectedOutputBash: `echo "(opt \\"zero\\")"`
    },
    {
        bash: `dfx canister call key_value_store get '("1")'`,
        expectedOutputBash: `echo "(opt \\"one\\")"`
    }
];

run_tests(tests);