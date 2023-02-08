import {
    Func,
    FuncQuery,
    FuncUpdate,
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
    self,
    Test,
    TestVariant,
    Thing,
    User,
    User1,
    UserVariant
} from './types';

$query;
export function inline_record_return_type(): {
    prop1: string;
    prop2: string;
} {
    return {
        prop1: 'prop1',
        prop2: 'prop2'
    };
}

$query;
export function inline_record_param(param: { prop1: string }): string {
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
export function record_referencing_other_types_from_return_type(): {
    prop1: string;
    prop2: Thing;
} {
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
export function record_referencing_record_from_param(param1: {
    test: Test;
}): string {
    return param1.test.id;
}

$query;
export function record_referencing_variant_from_param(param1: {
    testVariant: TestVariant;
}): Opt<string> {
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
    {
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<{ prop1: nat }>;
    },
    {
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }
>(0, 100, 100);

$update;
export function stable_map_insert(
    key: {
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<{ prop1: nat }>;
    },
    value: {
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }
): Variant<{
    ok: Opt<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>;
    err: InsertError;
}> {
    return stable_map.insert(key, value);
}

$query;
export function stable_map_get(key: {
    prop1: Opt<string>;
    prop2: Variant<{ var1: null; var2: TestVariant }>;
    prop3: Opt<{ prop1: nat }>;
}): Opt<{
    variant: Variant<{ var1: null; var2: TestVariant }>;
}> {
    return stable_map.get(key);
}

$update;
export async function inline_record_return_type_as_external_canister_call(): Promise<
    Variant<{
        ok: {
            prop1: string;
            prop2: string;
        };
        err: string;
    }>
> {
    return await self.inline_record_return_type().call();
}

$query;
export function inline_func(
    callback: Func<
        FuncQuery<
            (
                primitive: string,
                opt: Opt<{
                    primitive: nat;
                    opt: Opt<string>;
                    vec: string[];
                    record: { prop1: string };
                    variant: Variant<{ v1: null; v2: null }>;
                    func: Func<FuncUpdate<() => string>>;
                }>,
                vec: {
                    primitive: nat;
                    opt: Opt<string>;
                    vec: string[];
                    record: { prop1: string };
                    variant: Variant<{ v1: null; v2: null }>;
                    func: Func<FuncUpdate<() => string>>;
                }[],
                record: {
                    prop1: string;
                    optional: Opt<nat64>;
                    variant: Variant<{ v1: null; v2: null }>;
                },
                variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>,
                func: Func<
                    FuncQuery<
                        () => {
                            prop1: string;
                            variant: Variant<{
                                v1: null;
                                v2: { prop1: string };
                            }>;
                        }
                    >
                >
            ) => void
        >
    >
): Func<
    FuncQuery<
        (
            primitive: string,
            opt: Opt<{
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: { prop1: string };
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<FuncUpdate<() => string>>;
            }>,
            vec: {
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: { prop1: string };
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<FuncUpdate<() => string>>;
            }[],
            record: {
                prop1: string;
                optional: Opt<nat64>;
                variant: Variant<{ v1: null; v2: null }>;
            },
            variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>,
            func: Func<
                FuncQuery<
                    () => {
                        prop1: string;
                        variant: Variant<{
                            v1: null;
                            v2: { prop1: string };
                        }>;
                    }
                >
            >
        ) => void
    >
> {
    return callback;
}

$query;
export function complex(record: {
    primitive: string;
    opt: Opt<{
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<FuncUpdate<() => string>>;
    }>;
    vec: {
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<FuncUpdate<() => string>>;
    }[];
    record: {
        prop1: string;
        optional: Opt<nat64>;
        variant: Variant<{ v1: null; v2: null }>;
    };
    variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>;
    func: Func<
        FuncQuery<
            () => {
                prop1: string;
                variant: Variant<{ v1: null; v2: { prop1: string } }>;
            }
        >
    >;
}): {
    primitive: string;
    opt: Opt<{
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<FuncUpdate<() => string>>;
    }>;
    vec: {
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<FuncUpdate<() => string>>;
    }[];
    record: {
        prop1: string;
        optional: Opt<nat64>;
        variant: Variant<{ v1: null; v2: null }>;
    };
    variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>;
    func: Func<
        FuncQuery<
            () => {
                prop1: string;
                variant: Variant<{ v1: null; v2: { prop1: string } }>;
            }
        >
    >;
} {
    return record;
}
