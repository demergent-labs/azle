export const idlFactory = ({ IDL }) => {
    const Thing = IDL.Record({ id: IDL.Text });
    const Test = IDL.Record({ id: IDL.Text });
    const Test1 = IDL.Record({ id: IDL.Text });
    const TestVariant = IDL.Variant({ prop1: IDL.Text, prop2: Test1 });
    const User1 = IDL.Record({
        id: IDL.Text,
        job: IDL.Record({ id: IDL.Text, title: IDL.Text })
    });
    const Bling = IDL.Record({ id: IDL.Text });
    const User = IDL.Record({ id: IDL.Text });
    const UserVariant = IDL.Variant({ prop1: IDL.Null });
    const Reaction = IDL.Variant({
        one: IDL.Null,
        two: IDL.Null,
        three: IDL.Record({ id: IDL.Text })
    });
    return IDL.Service({
        inlineRecordParam: IDL.Func(
            [IDL.Record({ prop1: IDL.Text })],
            [IDL.Text],
            ['query']
        ),
        inlineRecordReturnType: IDL.Func(
            [],
            [IDL.Record({ prop1: IDL.Text, prop2: IDL.Text })],
            ['query']
        ),
        inlineVariantParam: IDL.Func(
            [IDL.Variant({ var1: IDL.Null, var2: IDL.Null })],
            [IDL.Variant({ var1: IDL.Null, var2: IDL.Null })],
            ['query']
        ),
        inlineVariantReturnType: IDL.Func(
            [],
            [
                IDL.Variant({
                    var1: IDL.Null,
                    var2: IDL.Null,
                    var3: IDL.Null
                })
            ],
            ['query']
        ),
        recordReferencingOtherTypesFromReturnType: IDL.Func(
            [],
            [IDL.Record({ prop1: IDL.Text, prop2: Thing })],
            ['query']
        ),
        recordReferencingRecordFromParam: IDL.Func(
            [IDL.Record({ test: Test })],
            [IDL.Text],
            ['query']
        ),
        recordReferencingVariantFromParam: IDL.Func(
            [IDL.Record({ testVariant: TestVariant })],
            [IDL.Opt(IDL.Text)],
            ['query']
        ),
        recordWithInlineFields: IDL.Func([], [User1], ['query']),
        variantReferencingOtherTypesFromReturnType: IDL.Func(
            [],
            [IDL.Variant({ prop1: IDL.Text, prop2: Bling })],
            ['query']
        ),
        variantReferencingRecordFromParam: IDL.Func(
            [IDL.Variant({ prop1: User })],
            [],
            ['query']
        ),
        variantReferencingVariantFromParam: IDL.Func(
            [IDL.Variant({ prop1: UserVariant })],
            [],
            ['query']
        ),
        variantWithInlineFields: IDL.Func([], [Reaction], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
