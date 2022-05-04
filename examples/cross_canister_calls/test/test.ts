import { execSync } from 'child_process';
import {
    run_tests,
    Test
} from 'azle/test/new-test';
import { createActor } from '../src/dfx_generated/cross_canister_calls';

const canister_1 = createActor(
    'rrkah-fqaaa-aaaaa-aaaaq-cai', {
        agentOptions: {
            host: 'http://localhost:8000'
        }
    }
);

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code canister1 || true'
    },
    {
        bash: 'dfx canister uninstall-code canister2 || true'
    },
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call canister1 balance '("0")'`,
        expectedOutputBash: `echo "(variant { ok = 100 : nat64 })"`
    },
    {
        bash: `dfx canister call canister1 account '(record { id = "0" })'`,
        expectedOutputBash: `echo "(variant { ok = opt record { id = \\"0\\"; balance = 100 : nat64 } })"`
    },
    {
        bash: `dfx canister call canister1 balance '("1")'`,
        expectedOutputBash: `echo "(variant { ok = 0 : nat64 })"`
    },
    {
        bash: `dfx canister call canister1 account '(record { id = "1" })'`,
        expectedOutputBash: `echo "(variant { ok = null })"`
    },
    {
        bash: `dfx canister call canister1 accounts`,
        expectedOutputBash: `echo "(variant { ok = vec { record { id = \\"0\\"; balance = 100 : nat64 } } })"`
    },
    {
        bash: `dfx canister call canister1 transfer '("0", "1", 34)'`,
        expectedOutputBash: `echo "(variant { ok = 34 : nat64 })"`
    },
    {
        bash: `dfx canister call canister1 balance '("0")'`,
        expectedOutputBash: `echo "(variant { ok = 66 : nat64 })"`
    },
    {
        bash: `dfx canister call canister1 account '(record { id = "0" })'`,
        expectedOutputBash: `echo "(variant { ok = opt record { id = \\"0\\"; balance = 66 : nat64 } })"`
    },
    {
        bash: `dfx canister call canister1 balance '("1")'`,
        expectedOutputBash: `echo "(variant { ok = 34 : nat64 })"`
    },
    {
        bash: `dfx canister call canister1 account '(record { id = "1" })'`,
        expectedOutputBash: `echo "(variant { ok = opt record { id = \\"1\\"; balance = 34 : nat64 } })"`
    },
    {
        bash: `dfx canister call canister1 accounts`,
        expectedOutputBash: `echo "(\\n  variant {\\n    ok = vec {\\n      record { id = \\"0\\"; balance = 66 : nat64 };\\n      record { id = \\"1\\"; balance = 34 : nat64 };\\n    }\\n  },\\n)"`
    },
    {
        bash: `dfx canister call canister1 trap`,
        expectedOutputBash: `echo "(\\n  variant {\\n    err = \\"Rejection code 5, IC0503: Canister ryjl3-tyaaa-aaaaa-aaaba-cai trapped explicitly: hahahaha\\"\\n  },\\n)"`
    }
];

run_tests(tests);