import {
    Alias,
    blob,
    float32,
    float64,
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
    Query,
    Variant,
    Func,
    $query,
    Record,
    $update,
    Vec
} from 'azle';

type InlineExample = Record<{
    first_field: Record<{ one: boolean; two: string }>;
    second_field: Record<{ one: boolean; two: Record<{ thing: string }> }>;
    third_field: Record<{ one: boolean; two: string }>;
}>;

$query;
export function inline_query(param: InlineExample): void {}

$query;
export function simple_query(
    number: Opt<nat64>,
    string: string,
    otherthing: nat,
    boolThing: boolean
): string {
    return 'This is a query function';
}

type TypeAliasOfATypeRef = Alias<nat8>;

type SimpleTypeAlias = Alias<boolean>;

type Boolean = Alias<boolean>;
type Boolean2 = Alias<Boolean>;
type Boolean3 = Alias<Boolean2>;

type BooleanArray = Alias<Vec<Boolean>>;

type SimpleRecord = Record<{
    one: boolean;
    other: BooleanArray;
}>;

type Unused3 = Alias<boolean>;

type Unused2 = Alias<Unused3>;

type Unused = Alias<Unused2>;

type UsedType = Alias<Unused>;

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
export function complex_record_test(
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
export function one_variant(thing: Fun): void {
    one_variant({ cool: null, id: null });
}

$query;
export function various_variants(thing: Yes, thing2: Reaction): string {
    return 'hello';
}

type Yes = Variant<{
    One: null;
    Two: null;
    Three: null;
}>;

type SelfReferencingVariant = Variant<{
    // One: SelfReferencingVariant; //TODO: We should fix this in the CDK Framework
    Two: null;
}>;

// TODO start boxing things in funcs
// type SelfReferencingFunc = Func<
//     (first_param: boolean, second_param: SelfReferencingFunc) => Query<string>
// >;

type SelfReferencingTuple = [string, SelfReferencingTuple];

type SelfReferencingRecord = Record<{
    one: SelfReferencingRecord;
    two: string;
}>;

$query;
export function self_reference(
    variant: SelfReferencingVariant,
    record: SelfReferencingRecord,
    tuple: SelfReferencingTuple
    // func: SelfReferencingFunc
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
export function in_line(param: Record<{ one: nat16; two: nat16 }>): Record<{
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
export function not_so_simple(
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

// TODO Why can't we do 2d arrays of principals??
// $update;
// export function getPrincipals(principal_lists: Vec<Vec<Principal>>): void {}

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

type FuncWithInline = Func<
    Query<
        (
            inline_record: Record<{
                one: boolean;
                two: boolean;
                three: boolean;
            }>,
            inline_variant: Variant<{ one: string; two: null; three: boolean }>,
            inline_func: Func<Query<(param1: string) => string>>
        ) => string
    >
>;

$update;
export function everything_inline(
    record: RecordWithInline,
    variant: VariantWithInline,
    func: FuncWithInline
): void {}

type StructWithInlineArray = Record<{
    name: string;
    not_array: Record<{ thing: boolean; thing2: boolean }>;
    array: Record<{ thing: boolean; thing2: boolean }>[];
}>;

$query;
export function inline_vec(
    array: Record<{ thing: string; thing2: boolean }>[],
    struct_thing: StructWithInlineArray
): void {}
type CanisterOnly = Alias<boolean>;

type CanisterTuple1 = [
    string,
    nat64,
    Record<{ tuple_inline: boolean; tuple_inline2: string }>,
    CanisterOnly
];

$query;
export function tuple_test(tup: CanisterTuple1): void {}

type OptionAlias = Alias<Opt<Boolean>>;
type InlineOptionAlias = Alias<Opt<Record<{ inline_bool: boolean }>>>;
type InlineOptionStruct = Record<{
    opt: Opt<Record<{ inline_string: String }>>;
}>;

$update;
export function option_test(
    opt: OptionAlias,
    inline_opt: Opt<Record<{ thing: String }>>,
    inline_alias: InlineOptionAlias,
    struct_with_option: InlineOptionStruct,
    inline_struct_with_array: Record<{
        arr: Opt<Record<{ inline_number: nat16 }>>;
    }>
): void {}

type ArrayAlias = Alias<Vec<Boolean>>;
type InlineArrayAlias = Alias<Record<{ inline_bool: boolean }>[]>;
type InlineArrayStruct = Record<{
    arr: Record<{ inline_string: String }>[];
}>;

$update;
export function array_test(
    opt: ArrayAlias,
    inline_array: Record<{ thing: String }>[],
    inline_alias: InlineArrayAlias,
    struct_with_array: InlineArrayStruct,
    inline_struct_with_array: Record<{
        arr: Record<{ inline_number: nat16 }>[];
    }>
): void {}

type UltimateSelfRef = Record<{
    pen_ultimate: PenultimateSelfRef;
}>;

type PenultimateSelfRef = Record<{
    antepenultimate: AntepenultimateSelfRef;
}>;

type AntepenultimateSelfRef = Record<{
    ultimate: UltimateSelfRef;
}>;

$update;
export function ultimate_self_reference_test(self_ref: UltimateSelfRef): void {}

$update;
export function hash_duplication_test(
    record: Record<{ one: boolean; two: boolean; three: boolean }>,
    variant: Variant<{ one: boolean; two: boolean; three: boolean }>,
    record2: Record<{ one: boolean; two: boolean; three: boolean }>,
    variant2: Variant<{ one: boolean; two: boolean; three: boolean }>
): void {}
