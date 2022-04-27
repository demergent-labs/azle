import {
    run_tests,
    Test
} from 'azle/test';

const tests: Test[] = [
    {
        bash: 'dfx deploy'
    },
    {
        bash: `dfx canister call inline_types inlineRecordReturnType`,
        expectedOutputBash: `echo "(record { prop1 = \\"prop1\\"; prop2 = \\"prop2\\" })"`
    },
    {
        bash: `dfx canister call inline_types inlineRecordParam '(record { prop1 = "prop1" })'`,
        expectedOutputBash: `echo "(\\"prop1\\")"`
    },
    {
        bash: `dfx canister call inline_types inlineVariantReturnType`,
        expectedOutputBash: `echo "(variant { var1 })"`
    },
    {
        bash: `dfx canister call inline_types inlineVariantParam '(variant { var1 })'`,
        expectedOutputBash: `echo "(variant { var1 })"`
    },
    {
        bash: `dfx canister call inline_types inlineVariantParam '(variant { var2 })'`,
        expectedOutputBash: `echo "(variant { var2 })"`
    },
    {
        bash: `dfx canister call inline_types recordWithInlineFields`,
        expectedOutputBash: `echo "(record { id = \\"0\\"; job = record { id = \\"0\\"; title = \\"Software Developer\\" } })"`
    },
    {
        bash: `dfx canister call inline_types variantWithInlineFields`,
        expectedOutputBash: `echo "(variant { three = record { id = \\"0\\" } })"`
    },
    {
        bash: `dfx canister call inline_types recordReferencingOtherTypesFromReturnType`,
        expectedOutputBash: `echo "(record { prop1 = \\"prop1\\"; prop2 = record { id = \\"0\\" } })"`
    },
    {
        bash: `dfx canister call inline_types variantReferencingOtherTypesFromReturnType`,
        expectedOutputBash: `echo "(variant { prop2 = record { id = \\"0\\" } })"`
    },
    {
        bash: `dfx canister call inline_types recordReferencingRecordFromParam '(record { test = record { id = "0" }; })'`,
        expectedOutputBash: `echo "(\\"0\\")"`
    },
    {
        bash: `dfx canister call inline_types recordReferencingVariantFromParam '(record { testVariant = variant { prop1 = "0" } })'`,
        expectedOutputBash: `echo "(opt \\"0\\")"`
    },
    {
        bash: `dfx canister call inline_types recordReferencingVariantFromParam '(record { testVariant = variant { prop2 = record { id = "0" } } })'`,
        expectedOutputBash: `echo "(null)"`
    },
    {
        bash: `dfx canister call inline_types variantReferencingRecordFromParam '(variant { prop1 = record { id = "0" } })'`,
        expectedOutputBash: `echo "()"`
    },
    {
        bash: `dfx canister call inline_types variantReferencingVariantFromParam '(variant { prop1 = variant { prop1 } })'`,
        expectedOutputBash: `echo "()"`
    }
];

run_tests(tests);