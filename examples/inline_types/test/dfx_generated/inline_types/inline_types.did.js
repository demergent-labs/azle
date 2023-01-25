export const idlFactory = ({ IDL }) => {
    const AzleInline4757617411424063700 = IDL.Variant({
        v1: IDL.Null,
        v2: IDL.Null
    });
    const AzleInline5425011084426369860 = IDL.Record({ prop1: IDL.Text });
    const AzleInline6749962461773081605 = IDL.Record({
        opt: IDL.Opt(IDL.Text),
        vec: IDL.Vec(IDL.Text),
        primitive: IDL.Nat,
        func: IDL.Func([], [IDL.Text], []),
        variant: AzleInline4757617411424063700,
        record: AzleInline5425011084426369860
    });
    const AzleInline15295425182523572762 = IDL.Variant({
        v1: IDL.Null,
        v2: AzleInline5425011084426369860
    });
    const AzleInline827574703489418250 = IDL.Record({
        opt: IDL.Opt(IDL.Text),
        vec: IDL.Vec(IDL.Text),
        primitive: IDL.Nat,
        func: IDL.Func([], [IDL.Text], []),
        variant: AzleInline4757617411424063700,
        record: AzleInline5425011084426369860
    });
    const AzleInline3791267007330743508 = IDL.Variant({
        v1: IDL.Null,
        v2: AzleInline5425011084426369860
    });
    const AzleInline10480804940496767436 = IDL.Record({
        prop1: IDL.Text,
        prop2: IDL.Text
    });
    const ManualReply = IDL.Variant({
        ok: AzleInline10480804940496767436,
        err: IDL.Text
    });
    const AzleInline3095728308414029725 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null
    });
    const AzleInline2991347220123679547 = IDL.Variant({
        var1: IDL.Null,
        var2: IDL.Null,
        var3: IDL.Null
    });
    const Thing = IDL.Record({ id: IDL.Text });
    const AzleInline4640727576914707496 = IDL.Record({
        prop1: IDL.Text,
        prop2: Thing
    });
    const Test = IDL.Record({ id: IDL.Text });
    const AzleInline4325608397924534544 = IDL.Record({ test: Test });
    const TestVariant = IDL.Variant({ prop1: IDL.Text, prop2: Test });
    const AzleInline9021281505452364202 = IDL.Record({
        testVariant: TestVariant
    });
    const AzleInline16000916309646445968 = IDL.Record({
        id: IDL.Text,
        title: IDL.Text
    });
    const User1 = IDL.Record({
        id: IDL.Text,
        job: AzleInline16000916309646445968
    });
    const AzleInline1117332675614598022 = IDL.Variant({
        var1: IDL.Null,
        var2: TestVariant
    });
    const AzleInline8031342415594573560 = IDL.Record({
        variant: AzleInline1117332675614598022
    });
    const KeyTooLarge = IDL.Record({ max: IDL.Nat32, given: IDL.Nat32 });
    const InsertError = IDL.Variant({
        ValueTooLarge: KeyTooLarge,
        KeyTooLarge: KeyTooLarge
    });
    const AzleInline2833490720777586675 = IDL.Variant({
        ok: IDL.Opt(AzleInline8031342415594573560),
        err: InsertError
    });
    const AzleInline8263140294912128486 = IDL.Variant({ prop1: Test });
    const UserVariant = IDL.Variant({ prop1: IDL.Null });
    const AzleInline12207366142299072665 = IDL.Variant({ prop1: UserVariant });
    const Reaction = IDL.Variant({
        one: IDL.Null,
        two: IDL.Null,
        three: Test
    });
    return IDL.Service({
        inline_func: IDL.Func(
            [
                IDL.Func(
                    [
                        IDL.Text,
                        IDL.Opt(AzleInline6749962461773081605),
                        IDL.Vec(AzleInline6749962461773081605),
                        IDL.Record({
                            optional: IDL.Opt(IDL.Nat64),
                            prop1: IDL.Text,
                            variant: AzleInline4757617411424063700
                        }),
                        IDL.Variant({
                            v1: IDL.Null,
                            v2: IDL.Null,
                            v3: AzleInline5425011084426369860
                        }),
                        IDL.Func(
                            [],
                            [
                                IDL.Record({
                                    prop1: IDL.Text,
                                    variant: AzleInline15295425182523572762
                                })
                            ],
                            ['query']
                        )
                    ],
                    [],
                    ['query']
                )
            ],
            [
                IDL.Func(
                    [
                        IDL.Text,
                        IDL.Opt(AzleInline827574703489418250),
                        IDL.Vec(AzleInline827574703489418250),
                        IDL.Record({
                            optional: IDL.Opt(IDL.Nat64),
                            prop1: IDL.Text,
                            variant: AzleInline4757617411424063700
                        }),
                        IDL.Variant({
                            v1: IDL.Null,
                            v2: IDL.Null,
                            v3: AzleInline5425011084426369860
                        }),
                        IDL.Func(
                            [],
                            [
                                IDL.Record({
                                    prop1: IDL.Text,
                                    variant: AzleInline3791267007330743508
                                })
                            ],
                            ['query']
                        )
                    ],
                    [],
                    ['query']
                )
            ],
            ['query']
        ),
        inline_record_param: IDL.Func(
            [AzleInline5425011084426369860],
            [IDL.Text],
            ['query']
        ),
        inline_record_return_type: IDL.Func(
            [],
            [AzleInline10480804940496767436],
            ['query']
        ),
        inline_record_return_type_as_external_canister_call: IDL.Func(
            [],
            [ManualReply],
            []
        ),
        inline_variant_param: IDL.Func(
            [AzleInline3095728308414029725],
            [AzleInline3095728308414029725],
            ['query']
        ),
        inline_variant_return_type: IDL.Func(
            [],
            [AzleInline2991347220123679547],
            ['query']
        ),
        record_referencing_other_types_from_return_type: IDL.Func(
            [],
            [AzleInline4640727576914707496],
            ['query']
        ),
        record_referencing_record_from_param: IDL.Func(
            [AzleInline4325608397924534544],
            [IDL.Text],
            ['query']
        ),
        record_referencing_variant_from_param: IDL.Func(
            [AzleInline9021281505452364202],
            [IDL.Opt(IDL.Text)],
            ['query']
        ),
        record_with_inline_fields: IDL.Func([], [User1], ['query']),
        stable_map_get: IDL.Func(
            [IDL.Text],
            [IDL.Opt(AzleInline8031342415594573560)],
            ['query']
        ),
        stable_map_insert: IDL.Func(
            [IDL.Text, AzleInline8031342415594573560],
            [AzleInline2833490720777586675],
            []
        ),
        variant_referencing_other_types_from_return_type: IDL.Func(
            [],
            [TestVariant],
            ['query']
        ),
        variant_referencing_record_from_param: IDL.Func(
            [AzleInline8263140294912128486],
            [],
            ['query']
        ),
        variant_referencing_variant_from_param: IDL.Func(
            [AzleInline12207366142299072665],
            [],
            ['query']
        ),
        variant_with_inline_fields: IDL.Func([], [Reaction], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
