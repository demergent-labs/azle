import {
    blob,
    float32,
    float64,
    Func,
    int16,
    int32,
    int64,
    int8,
    nat,
    nat16,
    nat32,
    nat64,
    nat8,
    Opt,
    Principal,
    $query,
    Query,
    Record,
    Tuple,
    $update,
    Variant,
    Vec
} from 'azle';

type InlineExample = Record<{
    first_field: Record<{ one: boolean; two: string }>;
    second_field: Record<{ one: boolean; two: Record<{ thing: string }> }>;
    third_field: Record<{ one: boolean; two: string }>;
}>;

$query;
export function inlineQuery(param: InlineExample): void {}

$query;
export function simpleQuery(
    number: Opt<nat64>,
    string: string,
    otherThing: nat,
    boolThing: boolean
): string {
    return 'This is a query function';
}

type TypeAliasOfATypeRef = nat8;

type SimpleTypeAlias = boolean;

type Boolean = boolean;
type Boolean2 = Boolean;
type Boolean3 = Boolean2;

type BooleanArray = Vec<Boolean>;

type SimpleRecord = Record<{
    one: boolean;
    other: BooleanArray;
}>;

type Unused3 = boolean;

type Unused2 = Unused3;

type Unused = Unused2;

type UsedType = Unused;

type DeepInlineRecords = Record<{
    one: Record<{ thing: boolean }>;
    six: Record<{ one: string; two: SimpleRecord }>;
}>;

type RecordWithoutDirectInlineRecords = Record<{
    one: DeepInlineRecords;
}>;

type TypeAliasOnlyUsedInline = Record<{
    one: boolean;
}>;

type ComplexRecord = Record<{
    one: nat16;
    two: boolean;
    three: SimpleTypeAlias;
    four: Vec<Boolean>;
    five: Vec<SimpleRecord>;
    six: Record<{ one: string; two: SimpleRecord }>;
    seven: RecordWithoutDirectInlineRecords;
}>;

$query;
export function complexRecordTest(
    param: ComplexRecord,
    simple: SimpleRecord,
    other: UsedType,
    inline_test1: Record<{
        one: string;
        two: SimpleRecord;
        three: UsedType;
    }>,
    other_inline_test2: Record<{
        one: boolean;
        two: nat16;
        three: ComplexRecord;
    }>,
    inline_test: Record<{
        one: string;
        two: SimpleRecord;
        three: Record<{ sub_one: boolean; sub_two: UsedType }>;
        four: Record<{
            sub_one: boolean;
            sub_two: Record<{ sub_three: UsedType }>;
        }>;
    }>,
    other_inline_test: Record<{
        one: Record<{ one_inline: boolean }>;
        two: Record<{ two_inline: nat16 }>;
        three: Record<{ three_inline: ComplexRecord }>;
    }>,
    inline_with_type_alias_dependency: Record<{
        one: TypeAliasOnlyUsedInline;
    }>
): TypeAliasOfATypeRef {
    return 1;
}

type Fun = Variant<{
    id?: null;
    cool?: null;
}>;

$query;
export function oneVariant(thing: Fun): void {}

$query;
export function variousVariants(thing: Yes, thing2: Reaction): string {
    return 'hello';
}

type Yes = Variant<{
    One: null;
    Two: null;
    Three: null;
}>;

type SelfReferencingVariant = Variant<{
    One: SelfReferencingVariant;
    Two: null;
}>;

type SelfReferencingFunc = Func<
    Query<
        (first_param: boolean, second_param: Opt<SelfReferencingFunc>) => string
    >
>;

type SelfReferencingTuple = Tuple<[string, Opt<SelfReferencingTuple>]>;

type SelfReferencingRecord = Record<{
    one: Opt<SelfReferencingRecord>;
    two: string;
}>;

$query;
export function selfReference(
    variant: SelfReferencingVariant,
    record: SelfReferencingRecord,
    tuple: SelfReferencingTuple,
    func: SelfReferencingFunc
): void {}

type Reaction = Variant<{
    Fire: null;
    Great: null;
    Good: Good;
    Fun: Fun;
}>;

type Good = Record<{
    id: string;
}>;

$query;
export function inline(param: Record<{ one: nat16; two: nat16 }>): Record<{
    one: string;
    two: Record<{
        two_a: Record<{
            two_a_i: nat16;
        }>;
        two_b: boolean;
    }>;
}> {
    return {
        one: 'hello',
        two: {
            two_a: {
                two_a_i: 2
            },
            two_b: false
        }
    };
}

$update;
export function notSoSimple(
    one: Vec<int8>,
    two: int16,
    three: int32,
    four: int64,
    five: nat8,
    six: nat16,
    seven: nat32,
    eight: nat64,
    nine: blob,
    ten: float32,
    eleven: float64,
    twelve: Principal,
    thirteen: null,
    fourteen: Record<{ thing: string }>
): void {}

$update;
export function getPrincipals(
    principal_lists: Vec<Vec<Principal>>
): Vec<Vec<Principal>> {
    return principal_lists;
}

type RecordWithInline = Record<{
    inline_record: Record<{ one: boolean; two: boolean; three: boolean }>;
    inline_variant: Variant<{ one: string; two: null; three: boolean }>;
    inline_func: Func<Query<(param1: string) => string>>;
}>;

type VariantWithInline = Variant<{
    thing: null;
    inline_record: Record<{ one: boolean; two: boolean; three: boolean }>;
    inline_variant: Variant<{ one: string; two: null; three: boolean }>;
    inline_func: Func<Query<(param1: string) => string>>;
}>;

// TODO: Funcs with inline types don't currently work
// See https://github.com/demergent-labs/azle/issues/1087
//
// type FuncWithInline = Func<
//     Query<
//         (
//             inline_record: Record<{
//                 one: boolean;
//                 two: boolean;
//                 three: boolean;
//             }>,
//             inline_variant: Variant<{ one: string; two: null; three: boolean }>,
//             inline_func: Func<Query<(param1: string) => string>>
//         ) => string
//     >
// >;

$update;
export function everythingInline(
    record: RecordWithInline,
    variant: VariantWithInline
    // func: FuncWithInline
): void {}

type StructWithInlineArray = Record<{
    name: string;
    not_array: Record<{ thing: boolean; thing2: boolean }>;
    array: Vec<Record<{ thing: boolean; thing2: boolean }>>;
}>;

$query;
export function inlineVec(
    array: Vec<Record<{ thing: string; thing2: boolean }>>,
    struct_thing: StructWithInlineArray
): void {}
type CanisterOnly = boolean;

type CanisterTuple1 = Tuple<
    [
        string,
        nat64,
        Record<{ tuple_inline: boolean; tuple_inline2: string }>,
        CanisterOnly
    ]
>;

$query;
export function tupleTest(tup: CanisterTuple1): void {}

type OptionAlias = Opt<Boolean>;
type InlineOptionAlias = Opt<Record<{ inline_bool: boolean }>>;
type InlineOptionStruct = Record<{
    opt: Opt<Record<{ inline_string: string }>>;
}>;

$update;
export function optionTest(
    opt: OptionAlias,
    inline_opt: Opt<Record<{ thing: string }>>,
    inline_alias: InlineOptionAlias,
    struct_with_option: InlineOptionStruct,
    inline_struct_with_array: Record<{
        arr: Opt<Record<{ inline_number: nat16 }>>;
    }>
): void {}

type ArrayAlias = Vec<Boolean>;
type InlineArrayAlias = Vec<Record<{ inline_bool: boolean }>>;
type InlineArrayStruct = Record<{
    arr: Vec<Record<{ inline_string: string }>>;
}>;

$update;
export function arrayTest(
    opt: ArrayAlias,
    inline_array: Vec<Record<{ thing: string }>>,
    inline_alias: InlineArrayAlias,
    struct_with_array: InlineArrayStruct,
    inline_struct_with_array: Record<{
        arr: Vec<Record<{ inline_number: nat16 }>>;
    }>
): void {}

type UltimateSelfRef = Record<{
    pen_ultimate: PenultimateSelfRef;
}>;

type PenultimateSelfRef = Record<{
    antepenultimate: AntepenultimateSelfRef;
}>;

type AntepenultimateSelfRef = Record<{
    ultimate: Opt<UltimateSelfRef>;
}>;

$update;
export function ultimateSelfReferenceTest(self_ref: UltimateSelfRef): void {}

$update;
export function hashDuplicationTest(
    record: Record<{ one: boolean; two: boolean; three: boolean }>,
    variant: Variant<{ one: boolean; two: boolean; three: boolean }>,
    record2: Record<{ one: boolean; two: boolean; three: boolean }>,
    variant2: Variant<{ one: boolean; two: boolean; three: boolean }>
): void {}

type VoidAlias = void;

$query;
export function voidAliasTest(): VoidAlias {}
