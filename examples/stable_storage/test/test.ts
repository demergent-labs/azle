import {
    run_tests,
    Test
} from 'azle/test';

const initial_reads: Test[] = [
    {
        bash: `dfx canister call stable_storage readStableInt`,
        expectedOutputBash: `echo "(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt64`,
        expectedOutputBash: `echo "(9_223_372_036_854_775_807 : int64)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt32`,
        expectedOutputBash: `echo "(2_147_483_647 : int32)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt16`,
        expectedOutputBash: `echo "(32_767 : int16)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt8`,
        expectedOutputBash: `echo "(127 : int8)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat`,
        expectedOutputBash: `echo "(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat64`,
        expectedOutputBash: `echo "(18_446_744_073_709_551_615 : nat64)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat32`,
        expectedOutputBash: `echo "(4_294_967_295 : nat32)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat16`,
        expectedOutputBash: `echo "(65_535 : nat16)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat8`,
        expectedOutputBash: `echo "(255 : nat8)"`
    },
    {
        bash: `dfx canister call stable_storage readStableString`,
        expectedOutputBash: `echo "(\\"Hello there\\")"`
    },
    {
        bash: `dfx canister call stable_storage readStablePrincipal`,
        expectedOutputBash: `echo "(principal \\"rrkah-fqaaa-aaaaa-aaaaq-cai\\")"`
    },
    {
        bash: `dfx canister call stable_storage readStableUser`,
        expectedOutputBash: `echo "(\\n  record {\\n    id = \\"0\\";\\n    country = variant { CANADA };\\n    children = vec { record { id = \\"1\\" } };\\n  },\\n)"`
    },
    {
        bash: `dfx canister call stable_storage readStableReaction`,
        expectedOutputBash: `echo "(variant { Emotion = variant { Happy } })"`
    }
];

const writes: Test[] = [
    {
        bash: `dfx canister call stable_storage writeStableInt '(0)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableInt64 '(1)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableInt32 '(2)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableInt16 '(3)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableInt8 '(4)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableNat '(5)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableNat64 '(6)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableNat32 '(7)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableNat16 '(8)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableNat8 '(9)'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableString '("Yes sir!")'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStablePrincipal '(principal "ryjl3-tyaaa-aaaaa-aaaba-cai")'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableUser '(record { id = "2"; country = variant { UK }; children = vec { record { id = "3" } }; })'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call stable_storage writeStableReaction '(variant { Fireworks = record { id = "0"; name = "Mega Firework" } })'`,
        expectedOutputBash: `echo "()"`
    }
];

const check_writes: Test[] = [
    {
        bash: `dfx canister call stable_storage readStableInt`,
        expectedOutputBash: `echo "(0 : int)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt64`,
        expectedOutputBash: `echo "(1 : int64)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt32`,
        expectedOutputBash: `echo "(2 : int32)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt16`,
        expectedOutputBash: `echo "(3 : int16)"`
    },
    {
        bash: `dfx canister call stable_storage readStableInt8`,
        expectedOutputBash: `echo "(4 : int8)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat`,
        expectedOutputBash: `echo "(5 : nat)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat64`,
        expectedOutputBash: `echo "(6 : nat64)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat32`,
        expectedOutputBash: `echo "(7 : nat32)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat16`,
        expectedOutputBash: `echo "(8 : nat16)"`
    },
    {
        bash: `dfx canister call stable_storage readStableNat8`,
        expectedOutputBash: `echo "(9 : nat8)"`
    },
    {
        bash: `dfx canister call stable_storage readStableString`,
        expectedOutputBash: `echo "(\\"Yes sir!\\")"`
    },
    {
        bash: `dfx canister call stable_storage readStablePrincipal`,
        expectedOutputBash: `echo "(principal \\"ryjl3-tyaaa-aaaaa-aaaba-cai\\")"`
    },
    {
        bash: `dfx canister call stable_storage readStableUser`,
        expectedOutputBash: `echo "(\\n  record {\\n    id = \\"2\\";\\n    country = variant { UK };\\n    children = vec { record { id = \\"3\\" } };\\n  },\\n)"`
    },
    {
        bash: `dfx canister call stable_storage readStableReaction`,
        expectedOutputBash: `echo "(variant { Fireworks = record { id = \\"0\\"; name = \\"Mega Firework\\" } })"`
    }
];

const tests: Test[] = [
    {
        bash: 'dfx canister uninstall-code stable_storage || true'
    },
    {
        bash: 'dfx deploy'
    },
    ...initial_reads,
    ...writes,
    ...check_writes,
    {
        // TODO Get rid of this once https://forum.dfinity.org/t/upgrade-a-canister-even-if-the-wasm-module-hash-has-not-changed/11989
        bash: 'echo "\\n\\nexport function hack(): Query<void> {}" >> src/stable_storage.ts'
    },
    {
        bash: 'dfx deploy'
    },
    ...check_writes
];

run_tests(tests);