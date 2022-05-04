import { execSync } from 'child_process';
import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { createActor } from '../src/dfx_generated/complex_types';

const complex_types_canister = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code complex_types || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call complex_types getAllUsers '(0)'`,
        expectedOutputBash: `echo "(vec {})"`
    },
    {
        bash: `dfx canister call complex_types createUser '("user1", 0)'`,
        expectedOutputBash: `echo "(\\n  record {\\n    id = \\"0\\";\\n    username = \\"user1\\";\\n    threads = vec {};\\n    posts = vec {};\\n    reactions = vec {};\\n  },\\n)"`
    },
    {
        bash: `dfx canister call complex_types getAllUsers '(0)'`,
        expectedOutputBash: `echo "(\\n  vec {\\n    record {\\n      id = \\"0\\";\\n      username = \\"user1\\";\\n      threads = vec {};\\n      posts = vec {};\\n      reactions = vec {};\\n    };\\n  },\\n)"`
    }
];

run_tests(tests);