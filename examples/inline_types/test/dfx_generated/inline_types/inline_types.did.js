export const idlFactory = ({ IDL }) => {
    const AzleInline13530079310912768182 = IDL.Record({ prop1: IDL.Text });
    const AzleInline15786395987032304672 = IDL.Record({
        prop1: IDL.Text,
        prop2: IDL.Text
    });
    const AzleInline13423010507345434471 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null
    });
    const AzleInline156434819094452493 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null
    });
    const AzleInline14275466479066864989 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null,
        var3: IDL.Null
    });
    const Thing = IDL.Record({ id: IDL.Text });
    const AzleInline167177491712464616 = IDL.Record({
        prop1: IDL.Text,
        prop2: Thing
    });
    const Test = IDL.Record({ id: IDL.Text });
    const AzleInline14676384386632048218 = IDL.Record({ test: Test });
    const TestVariant = IDL.Variant({ prop1: IDL.Text, prop2: Test });
    const AzleInline5249703271645679611 = IDL.Record({
        testVariant: TestVariant
    });
    const AzleInline5397522723222631180 = IDL.Record({
        id: IDL.Text,
        title: IDL.Text
    });
    const User1 = IDL.Record({
        id: IDL.Text,
        job: AzleInline5397522723222631180
    });
    const AzleInline1777414534694048784 = IDL.Variant({
        var1: IDL.Null,
        var2: TestVariant
    });
    const AzleInline1717034695179480952 = IDL.Record({
        variant: AzleInline1777414534694048784
    });
    const KeyTooLarge = IDL.Record({ max: IDL.Nat32, given: IDL.Nat32 });
    const InsertError = IDL.Variant({
        ValueTooLarge: KeyTooLarge,
        KeyTooLarge: KeyTooLarge
    });
    const AzleInline16638339814416658399 = IDL.Variant({
        ok: IDL.Opt(AzleInline1717034695179480952),
        err: InsertError
    });
    const AzleInline15488147339429212320 = IDL.Variant({ prop1: Test });
    const UserVariant = IDL.Variant({ prop1: IDL.Null });
    const AzleInline963517276188767052 = IDL.Variant({ prop1: UserVariant });
    const Reaction = IDL.Variant({
        one: IDL.Null,
        two: IDL.Null,
        three: Test
    });
    return IDL.Service({
        inlineRecordParam: IDL.Func(
            [AzleInline13530079310912768182],
            [IDL.Text],
            ['query']
        ),
        inlineRecordReturnType: IDL.Func(
            [],
            [AzleInline15786395987032304672],
            ['query']
        ),
        inlineVariantParam: IDL.Func(
            [AzleInline13423010507345434471],
            [AzleInline156434819094452493],
            ['query']
        ),
        inlineVariantReturnType: IDL.Func(
            [],
            [AzleInline14275466479066864989],
            ['query']
        ),
        recordReferencingOtherTypesFromReturnType: IDL.Func(
            [],
            [AzleInline167177491712464616],
            ['query']
        ),
        recordReferencingRecordFromParam: IDL.Func(
            [AzleInline14676384386632048218],
            [IDL.Text],
            ['query']
        ),
        recordReferencingVariantFromParam: IDL.Func(
            [AzleInline5249703271645679611],
            [IDL.Opt(IDL.Text)],
            ['query']
        ),
        recordWithInlineFields: IDL.Func([], [User1], ['query']),
        stable_map_get: IDL.Func(
            [IDL.Text],
            [IDL.Opt(AzleInline1717034695179480952)],
            ['query']
        ),
        stable_map_insert: IDL.Func(
            [IDL.Text, AzleInline1717034695179480952],
            [AzleInline16638339814416658399],
            []
        ),
        variantReferencingOtherTypesFromReturnType: IDL.Func(
            [],
            [TestVariant],
            ['query']
        ),
        variantReferencingRecordFromParam: IDL.Func(
            [AzleInline15488147339429212320],
            [],
            ['query']
        ),
        variantReferencingVariantFromParam: IDL.Func(
            [AzleInline963517276188767052],
            [],
            ['query']
        ),
        variantWithInlineFields: IDL.Func([], [Reaction], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
