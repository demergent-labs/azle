import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call primitive_types getInt`,
        expectedOutputBash: `echo "(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)"`
    },
    {
        bash: `dfx canister call primitive_types printInt '(170_141_183_460_469_231_731_687_303_715_884_105_727)'`,
        expectedOutputBash: `echo "(170_141_183_460_469_231_731_687_303_715_884_105_727 : int)"`
    },
    {
        bash: `dfx canister call primitive_types getInt64`,
        expectedOutputBash: `echo "(9_223_372_036_854_775_807 : int64)"`
    },
    {
        bash: `dfx canister call primitive_types printInt64 '(9_223_372_036_854_775_807)'`,
        expectedOutputBash: `echo "(9_223_372_036_854_775_807 : int64)"`
    },
    {
        bash: `dfx canister call primitive_types getInt32`,
        expectedOutputBash: `echo "(2_147_483_647 : int32)"`
    },
    {
        bash: `dfx canister call primitive_types printInt32 '(2_147_483_647)'`,
        expectedOutputBash: `echo "(2_147_483_647 : int32)"`
    },
    {
        bash: `dfx canister call primitive_types getInt16`,
        expectedOutputBash: `echo "(32_767 : int16)"`
    },
    {
        bash: `dfx canister call primitive_types printInt16 '(32_767)'`,
        expectedOutputBash: `echo "(32_767 : int16)"`
    },
    {
        bash: `dfx canister call primitive_types getInt8`,
        expectedOutputBash: `echo "(127 : int8)"`
    },
    {
        bash: `dfx canister call primitive_types printInt8 '(127)'`,
        expectedOutputBash: `echo "(127 : int8)"`
    },
    {
        bash: `dfx canister call primitive_types getNat`,
        expectedOutputBash: `echo "(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)"`
    },
    {
        bash: `dfx canister call primitive_types printNat '(340_282_366_920_938_463_463_374_607_431_768_211_455)'`,
        expectedOutputBash: `echo "(340_282_366_920_938_463_463_374_607_431_768_211_455 : nat)"`
    },
    {
        bash: `dfx canister call primitive_types getNat64`,
        expectedOutputBash: `echo "(18_446_744_073_709_551_615 : nat64)"`
    },
    {
        bash: `dfx canister call primitive_types printNat64 '(18_446_744_073_709_551_615)'`,
        expectedOutputBash: `echo "(18_446_744_073_709_551_615 : nat64)"`
    },
    {
        bash: `dfx canister call primitive_types getNat32`,
        expectedOutputBash: `echo "(4_294_967_295 : nat32)"`
    },
    {
        bash: `dfx canister call primitive_types printNat32 '(4_294_967_295)'`,
        expectedOutputBash: `echo "(4_294_967_295 : nat32)"`
    },
    {
        bash: `dfx canister call primitive_types getNat16`,
        expectedOutputBash: `echo "(65_535 : nat16)"`
    },
    {
        bash: `dfx canister call primitive_types printNat16 '(65_535)'`,
        expectedOutputBash: `echo "(65_535 : nat16)"`
    },
    {
        bash: `dfx canister call primitive_types getNat8`,
        expectedOutputBash: `echo "(255 : nat8)"`
    },
    {
        bash: `dfx canister call primitive_types printNat8 '(255)'`,
        expectedOutputBash: `echo "(255 : nat8)"`
    },
    {
        bash: `dfx canister call primitive_types getFloat64`,
        expectedOutputBash: `echo "(2.718281828459045 : float64)"`
    },
    {
        bash: `dfx canister call primitive_types printFloat64 '(2.718281828459045)'`,
        expectedOutputBash: `echo "(2.718281828459045 : float64)"`
    },
    {
        bash: `dfx canister call primitive_types getFloat32`,
        expectedOutputBash: `echo "(3.1415927 : float32)"`
    },
    {
        bash: `dfx canister call primitive_types printFloat32 '(3.1415927)'`,
        expectedOutputBash: `echo "(3.1415927 : float32)"`
    },
    {
        bash: `dfx canister call primitive_types getPrincipal`,
        expectedOutputBash: `echo "(principal \\"rrkah-fqaaa-aaaaa-aaaaq-cai\\")"`
    },
    {
        bash: `dfx canister call primitive_types printPrincipal '(principal "rrkah-fqaaa-aaaaa-aaaaq-cai")'`,
        expectedOutputBash: `echo "(principal \\"rrkah-fqaaa-aaaaa-aaaaq-cai\\")"`
    }
];

run_tests(tests);