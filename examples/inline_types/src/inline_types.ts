import {
    Func,
    Query,
    Update,
    InsertError,
    nat,
    nat64,
    Opt,
    $query,
    StableBTreeMap,
    $update,
    Variant
} from 'azle';
import {
    Bling,
    Reaction,
    Record,
    self,
    Test,
    TestVariant,
    Thing,
    User,
    User1,
    UserVariant
} from './types';

$query;
export function inline_record_return_type(): Record<{
    prop1: string;
    prop2: string;
}> {
    return {
        prop1: 'prop1',
        prop2: 'prop2'
    };
}

$query;
export function inline_record_param(param: Record<{ prop1: string }>): string {
    return param.prop1;
}

$query;
export function inline_variant_return_type(): Variant<{
    var1: null;
    var2: null;
    var3: null;
}> {
    return {
        var1: null
    };
}

$query;
export function inline_variant_param(
    param: Variant<{ var1: null; var2: null }>
): Variant<{ var1: null; var2: null }> {
    if (param.var1 === null) {
        return {
            var1: null
        };
    } else {
        return {
            var2: null
        };
    }
}

$query;
export function record_with_inline_fields(): User1 {
    return {
        id: '0',
        job: {
            id: '0',
            title: 'Software Developer'
        }
    };
}

$query;
export function variant_with_inline_fields(): Reaction {
    return {
        three: {
            id: '0'
        }
    };
}

$query;
export function record_referencing_other_types_from_return_type(): Record<{
    prop1: string;
    prop2: Thing;
}> {
    return {
        prop1: 'prop1',
        prop2: {
            id: '0'
        }
    };
}

$query;
export function variant_referencing_other_types_from_return_type(): Variant<{
    prop1: string;
    prop2: Bling;
}> {
    return {
        prop2: {
            id: '0'
        }
    };
}

$query;
export function record_referencing_record_from_param(
    param1: Record<{
        test: Test;
    }>
): string {
    return param1.test.id;
}

$query;
export function record_referencing_variant_from_param(
    param1: Record<{
        testVariant: TestVariant;
    }>
): Opt<string> {
    if (param1.testVariant.prop1 !== undefined) {
        return param1.testVariant.prop1;
    }

    return null;
}

$query;
export function variant_referencing_record_from_param(
    param1: Variant<{ prop1: User }>
): void {}

$query;
export function variant_referencing_variant_from_param(
    param1: Variant<{ prop1: UserVariant }>
): void {}

let stable_map = new StableBTreeMap<
    Record<{
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<Record<{ prop1: nat }>>;
    }>,
    Record<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
>(0, 100, 100);

$update;
export function stable_map_insert(
    key: Record<{
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<Record<{ prop1: nat }>>;
    }>,
    value: Record<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
): Variant<{
    ok: Opt<
        Record<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>
    >;
    err: InsertError;
}> {
    return stable_map.insert(key, value);
}

$query;
export function stable_map_get(
    key: Record<{
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<Record<{ prop1: nat }>>;
    }>
): Opt<
    Record<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
> {
    return stable_map.get(key);
}

$update;
export async function inline_record_return_type_as_external_canister_call(): Promise<
    Variant<{
        ok: Record<{
            prop1: string;
            prop2: string;
        }>;
        err: string;
    }>
> {
    return await self.inline_record_return_type().call();
}

$query;
export function inline_func(
    callback: Func<
        Query<
            (
                primitive: string,
                opt: Opt<
                    Record<{
                        primitive: nat;
                        opt: Opt<string>;
                        vec: string[];
                        record: Record<{ prop1: string }>;
                        variant: Variant<{ v1: null; v2: null }>;
                        func: Func<Update<() => string>>;
                    }>
                >,
                vec: Record<{
                    primitive: nat;
                    opt: Opt<string>;
                    vec: string[];
                    record: Record<{ prop1: string }>;
                    variant: Variant<{ v1: null; v2: null }>;
                    func: Func<Update<() => string>>;
                }>[],
                record: Record<{
                    prop1: string;
                    optional: Opt<nat64>;
                    variant: Variant<{ v1: null; v2: null }>;
                }>,
                variant: Variant<{
                    v1: null;
                    v2: null;
                    v3: Record<{ prop1: string }>;
                }>,
                func: Func<
                    Query<
                        () => Record<{
                            prop1: string;
                            variant: Variant<{
                                v1: null;
                                v2: Record<{ prop1: string }>;
                            }>;
                        }>
                    >
                >
            ) => void
        >
    >
): Func<
    Query<
        (
            primitive: string,
            opt: Opt<
                Record<{
                    primitive: nat;
                    opt: Opt<string>;
                    vec: string[];
                    record: Record<{ prop1: string }>;
                    variant: Variant<{ v1: null; v2: null }>;
                    func: Func<Update<() => string>>;
                }>
            >,
            vec: Record<{
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: Record<{ prop1: string }>;
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<Update<() => string>>;
            }>[],
            record: Record<{
                prop1: string;
                optional: Opt<nat64>;
                variant: Variant<{ v1: null; v2: null }>;
            }>,
            variant: Variant<{
                v1: null;
                v2: null;
                v3: Record<{ prop1: string }>;
            }>,
            func: Func<
                Query<
                    () => Record<{
                        prop1: string;
                        variant: Variant<{
                            v1: null;
                            v2: Record<{ prop1: string }>;
                        }>;
                    }>
                >
            >
        ) => void
    >
> {
    return callback;
}

$query;
export function complex(
    record: Record<{
        primitive: string;
        opt: Opt<
            Record<{
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: Record<{ prop1: string }>;
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<Update<() => string>>;
            }>
        >;
        vec: Record<{
            primitive: nat;
            opt: Opt<string>;
            vec: string[];
            record: Record<{ prop1: string }>;
            variant: Variant<{ v1: null; v2: null }>;
            func: Func<Update<() => string>>;
        }>[];
        record: Record<{
            prop1: string;
            optional: Opt<nat64>;
            variant: Variant<{ v1: null; v2: null }>;
        }>;
        variant: Variant<{ v1: null; v2: null; v3: Record<{ prop1: string }> }>;
        func: Func<
            Query<
                () => Record<{
                    prop1: string;
                    variant: Variant<{
                        v1: null;
                        v2: Record<{ prop1: string }>;
                    }>;
                }>
            >
        >;
    }>
): Record<{
    primitive: string;
    opt: Opt<
        Record<{
            primitive: nat;
            opt: Opt<string>;
            vec: string[];
            record: Record<{ prop1: string }>;
            variant: Variant<{ v1: null; v2: null }>;
            func: Func<Update<() => string>>;
        }>
    >;
    vec: Record<{
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: Record<{ prop1: string }>;
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<Update<() => string>>;
    }>[];
    record: Record<{
        prop1: string;
        optional: Opt<nat64>;
        variant: Variant<{ v1: null; v2: null }>;
    }>;
    variant: Variant<{ v1: null; v2: null; v3: Record<{ prop1: string }> }>;
    func: Func<
        Query<
            () => Record<{
                prop1: string;
                variant: Variant<{ v1: null; v2: Record<{ prop1: string }> }>;
            }>
        >
    >;
}> {
    return record;
}
