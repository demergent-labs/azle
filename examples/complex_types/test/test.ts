import {
    run_tests,
    Test
} from 'azle/test';

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