import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AzleInline_10174769152289428498 {
    sub_one: boolean;
    sub_two: AzleInline_12477736162160781291;
}
export interface AzleInline_10550531413164410119 {
    one: boolean;
    two: AzleInline_4064619906461566232;
}
export interface AzleInline_11785136007535424815 {
    three_inline: ComplexRecord;
}
export interface AzleInline_11938290237207584742 {
    two_a: AzleInline_17024899950976082855;
    two_b: boolean;
}
export interface AzleInline_12477736162160781291 {
    sub_three: boolean;
}
export interface AzleInline_13325028789399404902 {
    thing: string;
    thing2: boolean;
}
export interface AzleInline_14090109093491927075 {
    one: string;
    two: SimpleRecord;
    three: boolean;
}
export interface AzleInline_1461050149674757944 {
    tuple_inline2: string;
    tuple_inline: boolean;
}
export interface AzleInline_14806421258981238475 {
    one: string;
    two: SimpleRecord;
    three: AzleInline_6196361535868770603;
    four: AzleInline_10174769152289428498;
}
export interface AzleInline_15730480668120121283 {
    one: TypeAliasOnlyUsedInline;
}
export interface AzleInline_15837983335320594581 {
    thing: boolean;
    thing2: boolean;
}
export interface AzleInline_17024899950976082855 {
    two_a_i: number;
}
export interface AzleInline_1805274857099726532 {
    one: string;
    two: SimpleRecord;
}
export interface AzleInline_2079212390168712599 {
    one: boolean;
    two: number;
    three: ComplexRecord;
}
export interface AzleInline_2474745210287299794 {
    one_inline: boolean;
}
export interface AzleInline_331500420231041961 {
    thing: string;
}
export interface AzleInline_4064619906461566232 {
    thing: string;
}
export interface AzleInline_4208827517137868323 {
    one: boolean;
    two: boolean;
    three: boolean;
}
export interface AzleInline_4502094796870336716 {
    one: AzleInline_2474745210287299794;
    two: AzleInline_7603740651129624619;
    three: AzleInline_11785136007535424815;
}
export interface AzleInline_5243159794805180565 {
    thing: boolean;
}
export interface AzleInline_6196361535868770603 {
    sub_one: boolean;
    sub_two: boolean;
}
export interface AzleInline_6786282192879576985 {
    one: string;
    two: AzleInline_11938290237207584742;
}
export interface AzleInline_7336418468724526833 {
    one: number;
    two: number;
}
export interface AzleInline_7603740651129624619 {
    two_inline: number;
}
export type AzleInline_8878595774774867537 =
    | { one: string }
    | { two: null }
    | { three: boolean };
export interface AzleInline_9864422139172514499 {
    one: boolean;
    two: string;
}
export interface ComplexRecord {
    one: number;
    six: AzleInline_1805274857099726532;
    two: boolean;
    three: boolean;
    five: Array<SimpleRecord>;
    four: Array<boolean>;
    seven: RecordWithoutDirectInlineRecords;
}
export interface DeepInlineRecords {
    one: AzleInline_5243159794805180565;
    six: AzleInline_1805274857099726532;
}
export type Fun = { id: null } | { cool: null };
export interface Good {
    id: string;
}
export interface InlineExample {
    second_field: AzleInline_10550531413164410119;
    first_field: AzleInline_9864422139172514499;
    third_field: AzleInline_9864422139172514499;
}
export type Reaction =
    | { Fun: Fun }
    | { Great: null }
    | { Fire: null }
    | { Good: Good };
export interface RecordWithInline {
    inline_func: [Principal, string];
    inline_variant: AzleInline_8878595774774867537;
    inline_record: AzleInline_4208827517137868323;
}
export interface RecordWithoutDirectInlineRecords {
    one: DeepInlineRecords;
}
export interface SelfReferencingRecord {
    one: SelfReferencingRecord;
    two: string;
}
export type SelfReferencingTuple = [string, SelfReferencingTuple];
export type SelfReferencingVariant =
    | { One: SelfReferencingVariant }
    | { Two: null };
export interface SimpleRecord {
    one: boolean;
    other: Array<boolean>;
}
export interface StructWithInlineArray {
    array: Array<AzleInline_15837983335320594581>;
    name: string;
    not_array: AzleInline_15837983335320594581;
}
export interface TypeAliasOnlyUsedInline {
    one: boolean;
}
export type VariantWithInline =
    | { thing: null }
    | { inline_func: [Principal, string] }
    | { inline_variant: AzleInline_8878595774774867537 }
    | { inline_record: AzleInline_4208827517137868323 };
export type Yes = { One: null } | { Two: null } | { Three: null };
export interface _SERVICE {
    complex_record_test: ActorMethod<
        [
            ComplexRecord,
            SimpleRecord,
            boolean,
            AzleInline_14090109093491927075,
            AzleInline_2079212390168712599,
            AzleInline_14806421258981238475,
            AzleInline_4502094796870336716,
            AzleInline_15730480668120121283
        ],
        number
    >;
    everything_inline: ActorMethod<
        [RecordWithInline, VariantWithInline, [Principal, string]],
        undefined
    >;
    in_line: ActorMethod<
        [AzleInline_7336418468724526833],
        AzleInline_6786282192879576985
    >;
    inline_query: ActorMethod<[InlineExample], undefined>;
    inline_vec: ActorMethod<
        [Array<AzleInline_13325028789399404902>, StructWithInlineArray],
        undefined
    >;
    not_so_simple: ActorMethod<
        [
            Array<number>,
            number,
            number,
            bigint,
            number,
            number,
            number,
            bigint,
            Array<number>,
            number,
            number,
            Principal,
            null,
            AzleInline_331500420231041961
        ],
        undefined
    >;
    one_variant: ActorMethod<[Fun], undefined>;
    self_reference: ActorMethod<
        [
            SelfReferencingVariant,
            SelfReferencingRecord,
            [string, SelfReferencingTuple]
        ],
        undefined
    >;
    simple_query: ActorMethod<[[] | [bigint], string, bigint, boolean], string>;
    tuple_test: ActorMethod<
        [[string, bigint, AzleInline_1461050149674757944, boolean]],
        undefined
    >;
    various_variants: ActorMethod<[Yes, Reaction], string>;
}
