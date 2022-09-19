export const idlFactory = ({ IDL }) => {
    const SelfReferencingRecord = IDL.Rec();
    const SelfReferencingTuple = IDL.Rec();
    const SelfReferencingVariant = IDL.Rec();
    const SimpleRecord = IDL.Record({
        one: IDL.Bool,
        other: IDL.Vec(IDL.Bool)
    });
    const AzleInline_1805274857099726532 = IDL.Record({
        one: IDL.Text,
        two: SimpleRecord
    });
    const AzleInline_5243159794805180565 = IDL.Record({ thing: IDL.Bool });
    const DeepInlineRecords = IDL.Record({
        one: AzleInline_5243159794805180565,
        six: AzleInline_1805274857099726532
    });
    const RecordWithoutDirectInlineRecords = IDL.Record({
        one: DeepInlineRecords
    });
    const ComplexRecord = IDL.Record({
        one: IDL.Nat16,
        six: AzleInline_1805274857099726532,
        two: IDL.Bool,
        three: IDL.Bool,
        five: IDL.Vec(SimpleRecord),
        four: IDL.Vec(IDL.Bool),
        seven: RecordWithoutDirectInlineRecords
    });
    const AzleInline_14090109093491927075 = IDL.Record({
        one: IDL.Text,
        two: SimpleRecord,
        three: IDL.Bool
    });
    const AzleInline_2079212390168712599 = IDL.Record({
        one: IDL.Bool,
        two: IDL.Nat16,
        three: ComplexRecord
    });
    const AzleInline_6196361535868770603 = IDL.Record({
        sub_one: IDL.Bool,
        sub_two: IDL.Bool
    });
    const AzleInline_12477736162160781291 = IDL.Record({
        sub_three: IDL.Bool
    });
    const AzleInline_10174769152289428498 = IDL.Record({
        sub_one: IDL.Bool,
        sub_two: AzleInline_12477736162160781291
    });
    const AzleInline_14806421258981238475 = IDL.Record({
        one: IDL.Text,
        two: SimpleRecord,
        three: AzleInline_6196361535868770603,
        four: AzleInline_10174769152289428498
    });
    const AzleInline_2474745210287299794 = IDL.Record({
        one_inline: IDL.Bool
    });
    const AzleInline_7603740651129624619 = IDL.Record({
        two_inline: IDL.Nat16
    });
    const AzleInline_11785136007535424815 = IDL.Record({
        three_inline: ComplexRecord
    });
    const AzleInline_4502094796870336716 = IDL.Record({
        one: AzleInline_2474745210287299794,
        two: AzleInline_7603740651129624619,
        three: AzleInline_11785136007535424815
    });
    const TypeAliasOnlyUsedInline = IDL.Record({ one: IDL.Bool });
    const AzleInline_15730480668120121283 = IDL.Record({
        one: TypeAliasOnlyUsedInline
    });
    const AzleInline_8878595774774867537 = IDL.Variant({
        one: IDL.Text,
        two: IDL.Null,
        three: IDL.Bool
    });
    const AzleInline_4208827517137868323 = IDL.Record({
        one: IDL.Bool,
        two: IDL.Bool,
        three: IDL.Bool
    });
    const RecordWithInline = IDL.Record({
        inline_func: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        inline_variant: AzleInline_8878595774774867537,
        inline_record: AzleInline_4208827517137868323
    });
    const VariantWithInline = IDL.Variant({
        thing: IDL.Null,
        inline_func: IDL.Func([IDL.Text], [IDL.Text], ['query']),
        inline_variant: AzleInline_8878595774774867537,
        inline_record: AzleInline_4208827517137868323
    });
    const AzleInline_7336418468724526833 = IDL.Record({
        one: IDL.Nat16,
        two: IDL.Nat16
    });
    const AzleInline_17024899950976082855 = IDL.Record({ two_a_i: IDL.Nat16 });
    const AzleInline_11938290237207584742 = IDL.Record({
        two_a: AzleInline_17024899950976082855,
        two_b: IDL.Bool
    });
    const AzleInline_6786282192879576985 = IDL.Record({
        one: IDL.Text,
        two: AzleInline_11938290237207584742
    });
    const AzleInline_4064619906461566232 = IDL.Record({ thing: IDL.Text });
    const AzleInline_10550531413164410119 = IDL.Record({
        one: IDL.Bool,
        two: AzleInline_4064619906461566232
    });
    const AzleInline_9864422139172514499 = IDL.Record({
        one: IDL.Bool,
        two: IDL.Text
    });
    const InlineExample = IDL.Record({
        second_field: AzleInline_10550531413164410119,
        first_field: AzleInline_9864422139172514499,
        third_field: AzleInline_9864422139172514499
    });
    const AzleInline_13325028789399404902 = IDL.Record({
        thing: IDL.Text,
        thing2: IDL.Bool
    });
    const AzleInline_15837983335320594581 = IDL.Record({
        thing: IDL.Bool,
        thing2: IDL.Bool
    });
    const StructWithInlineArray = IDL.Record({
        array: IDL.Vec(AzleInline_15837983335320594581),
        name: IDL.Text,
        not_array: AzleInline_15837983335320594581
    });
    const AzleInline_331500420231041961 = IDL.Record({ thing: IDL.Text });
    const Fun = IDL.Variant({ id: IDL.Null, cool: IDL.Null });
    SelfReferencingVariant.fill(
        IDL.Variant({ One: SelfReferencingVariant, Two: IDL.Null })
    );
    SelfReferencingRecord.fill(
        IDL.Record({ one: SelfReferencingRecord, two: IDL.Text })
    );
    SelfReferencingTuple.fill(IDL.Tuple(IDL.Text, SelfReferencingTuple));
    const AzleInline_1461050149674757944 = IDL.Record({
        tuple_inline2: IDL.Text,
        tuple_inline: IDL.Bool
    });
    const Yes = IDL.Variant({
        One: IDL.Null,
        Two: IDL.Null,
        Three: IDL.Null
    });
    const Good = IDL.Record({ id: IDL.Text });
    const Reaction = IDL.Variant({
        Fun: Fun,
        Great: IDL.Null,
        Fire: IDL.Null,
        Good: Good
    });
    return IDL.Service({
        complex_record_test: IDL.Func(
            [
                ComplexRecord,
                SimpleRecord,
                IDL.Bool,
                AzleInline_14090109093491927075,
                AzleInline_2079212390168712599,
                AzleInline_14806421258981238475,
                AzleInline_4502094796870336716,
                AzleInline_15730480668120121283
            ],
            [IDL.Nat8],
            ['query']
        ),
        everything_inline: IDL.Func(
            [
                RecordWithInline,
                VariantWithInline,
                IDL.Func(
                    [
                        AzleInline_4208827517137868323,
                        AzleInline_8878595774774867537,
                        IDL.Func([IDL.Text], [IDL.Text], ['query'])
                    ],
                    [IDL.Text],
                    ['query']
                )
            ],
            [],
            []
        ),
        in_line: IDL.Func(
            [AzleInline_7336418468724526833],
            [AzleInline_6786282192879576985],
            ['query']
        ),
        inline_query: IDL.Func([InlineExample], [], ['query']),
        inline_vec: IDL.Func(
            [IDL.Vec(AzleInline_13325028789399404902), StructWithInlineArray],
            [],
            ['query']
        ),
        not_so_simple: IDL.Func(
            [
                IDL.Vec(IDL.Int8),
                IDL.Int16,
                IDL.Int32,
                IDL.Int64,
                IDL.Nat8,
                IDL.Nat16,
                IDL.Nat32,
                IDL.Nat64,
                IDL.Vec(IDL.Nat8),
                IDL.Float32,
                IDL.Float64,
                IDL.Principal,
                IDL.Null,
                AzleInline_331500420231041961
            ],
            [],
            []
        ),
        one_variant: IDL.Func([Fun], [], ['query']),
        self_reference: IDL.Func(
            [
                SelfReferencingVariant,
                SelfReferencingRecord,
                IDL.Tuple(IDL.Text, SelfReferencingTuple)
            ],
            [],
            ['query']
        ),
        simple_query: IDL.Func(
            [IDL.Opt(IDL.Nat64), IDL.Text, IDL.Nat, IDL.Bool],
            [IDL.Text],
            ['query']
        ),
        tuple_test: IDL.Func(
            [
                IDL.Tuple(
                    IDL.Text,
                    IDL.Nat64,
                    AzleInline_1461050149674757944,
                    IDL.Bool
                )
            ],
            [],
            ['query']
        ),
        various_variants: IDL.Func([Yes, Reaction], [IDL.Text], ['query'])
    });
};
export const init = ({ IDL }) => {
    return [];
};
