export const idlFactory = ({ IDL }) => {
    const AzleInline16809542106678444233 = IDL.Record({ prop1: IDL.Text });
    const AzleInline16946487161134791485 = IDL.Record({
        prop1: IDL.Text,
        prop2: IDL.Text
    });
    const AzleInline6116640699850554434 = IDL.Record({
        prop1: IDL.Text,
        prop2: IDL.Text
    });
    const ManualReply = IDL.Variant({
        ok: AzleInline6116640699850554434,
        err: IDL.Text
    });
    const AzleInline2027142959786216826 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null
    });
    const AzleInline14215406218807721013 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null,
        var3: IDL.Null
    });
    const Thing = IDL.Record({ id: IDL.Text });
    const AzleInline11634736081576687661 = IDL.Record({
        prop1: IDL.Text,
        prop2: Thing
    });
    const Test = IDL.Record({ id: IDL.Text });
    const AzleInline7265323866845130613 = IDL.Record({ test: Test });
    const TestVariant = IDL.Variant({ prop1: IDL.Text, prop2: Test });
    const AzleInline15804798520274070628 = IDL.Record({
        testVariant: TestVariant
    });
    const AzleInline7827425047821939920 = IDL.Record({
        id: IDL.Text,
        title: IDL.Text
    });
    const User1 = IDL.Record({
        id: IDL.Text,
        job: AzleInline7827425047821939920
    });
    const AzleInline12153674455018255041 = IDL.Variant({
        var1: IDL.Null,
        var2: TestVariant
    });
    const AzleInline15870045821780152702 = IDL.Record({
        variant: AzleInline12153674455018255041
    });
    const AzleInline7786076823068419125 = IDL.Record({
        variant: AzleInline12153674455018255041
    });
    const KeyTooLarge = IDL.Record({ max: IDL.Nat32, given: IDL.Nat32 });
    const InsertError = IDL.Variant({
        ValueTooLarge: KeyTooLarge,
        KeyTooLarge: KeyTooLarge
    });
    const AzleInline3802729132610108913 = IDL.Variant({
        ok: IDL.Opt(AzleInline7786076823068419125),
        err: InsertError
    });
    const AzleInline5278805839780097963 = IDL.Variant({ prop1: Test });
    const UserVariant = IDL.Variant({ prop1: IDL.Null });
    const AzleInline8195216860007363499 = IDL.Variant({ prop1: UserVariant });
    const Reaction = IDL.Variant({
        one: IDL.Null,
        two: IDL.Null,
        three: Test
    });
    return IDL.Service({
        inline_record_param: IDL.Func(
            [AzleInline16809542106678444233],
            [IDL.Text],
            ['query']
        ),
        inline_record_return_type: IDL.Func(
            [],
            [AzleInline16946487161134791485],
            ['query']
        ),
        inline_record_return_type_as_external_canister_call: IDL.Func(
            [],
            [ManualReply],
            []
        ),
        inline_variant_param: IDL.Func(
            [AzleInline2027142959786216826],
            [AzleInline2027142959786216826],
            ['query']
        ),
        inline_variant_return_type: IDL.Func(
            [],
            [AzleInline14215406218807721013],
            ['query']
        ),
        record_referencing_other_types_from_return_type: IDL.Func(
            [],
            [AzleInline11634736081576687661],
            ['query']
        ),
        record_referencing_record_from_param: IDL.Func(
            [AzleInline7265323866845130613],
            [IDL.Text],
            ['query']
        ),
        record_referencing_variant_from_param: IDL.Func(
            [AzleInline15804798520274070628],
            [IDL.Opt(IDL.Text)],
            ['query']
        ),
        record_with_inline_fields: IDL.Func([], [User1], ['query']),
        stable_map_get: IDL.Func(
            [IDL.Text],
            [IDL.Opt(AzleInline15870045821780152702)],
            ['query']
        ),
        stable_map_insert: IDL.Func(
            [IDL.Text, AzleInline7786076823068419125],
            [AzleInline3802729132610108913],
            []
        ),
        variant_referencing_other_types_from_return_type: IDL.Func(
            [],
            [TestVariant],
            ['query']
        ),
        variant_referencing_record_from_param: IDL.Func(
            [AzleInline5278805839780097963],
            [],
            ['query']
        ),
        variant_referencing_variant_from_param: IDL.Func(
            [AzleInline8195216860007363499],
            [],
            ['query']
        ),
        variant_with_inline_fields: IDL.Func([], [Reaction], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
