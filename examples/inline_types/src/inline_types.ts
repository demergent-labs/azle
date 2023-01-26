import {
    InsertError,
    Query,
    Variant,
    Opt,
    StableBTreeMap,
    Update,
    Func,
    nat64,
    nat
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

export function inline_record_return_type(): Query<{
    prop1: string;
    prop2: string;
}> {
    return {
        prop1: 'prop1',
        prop2: 'prop2'
    };
}

export function inline_record_param(param: { prop1: string }): Query<string> {
    return param.prop1;
}

export function inline_variant_return_type(): Query<
    Variant<{
        var1: null;
        var2: null;
        var3: null;
    }>
> {
    return {
        var1: null
    };
}

export function inline_variant_param(
    param: Variant<{ var1: null; var2: null }>
): Query<Variant<{ var1: null; var2: null }>> {
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

export function record_with_inline_fields(): Query<User1> {
    return {
        id: '0',
        job: {
            id: '0',
            title: 'Software Developer'
        }
    };
}

export function variant_with_inline_fields(): Query<Reaction> {
    return {
        three: {
            id: '0'
        }
    };
}

export function record_referencing_other_types_from_return_type(): Query<{
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

export function variant_referencing_other_types_from_return_type(): Query<
    Variant<{
        prop1: string;
        prop2: Bling;
    }>
> {
    return {
        prop2: {
            id: '0'
        }
    };
}

export function record_referencing_record_from_param(param1: {
    test: Test;
}): Query<string> {
    return param1.test.id;
}

export function record_referencing_variant_from_param(param1: {
    testVariant: TestVariant;
}): Query<Opt<string>> {
    if (param1.testVariant.prop1 !== undefined) {
        return param1.testVariant.prop1;
    }

    return null;
}

export function variant_referencing_record_from_param(
    param1: Variant<{ prop1: User }>
): Query<void> {}

export function variant_referencing_variant_from_param(
    param1: Variant<{ prop1: UserVariant }>
): Query<void> {}

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

export function stable_map_insert(
    key: {
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<{ prop1: nat }>;
    },
    value: {
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }
): Update<
    Variant<{
        ok: Opt<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>;
        err: InsertError;
    }>
> {
    return stable_map.insert(key, value);
}

export function stable_map_get(key: {
    prop1: Opt<string>;
    prop2: Variant<{ var1: null; var2: TestVariant }>;
    prop3: Opt<{ prop1: nat }>;
}): Query<
    Opt<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
> {
    return stable_map.get(key);
}

export async function inline_record_return_type_as_external_canister_call(): Promise<
    Update<
        Variant<{
            ok: {
                prop1: string;
                prop2: string;
            };
            err: string;
        }>
    >
> {
    return await self.inline_record_return_type().call();
}

export function inline_func(
    callback: Func<
        (
            primitive: string,
            opt: Opt<{
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: { prop1: string };
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<() => Update<string>>;
            }>,
            vec: {
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: { prop1: string };
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<() => Update<string>>;
            }[],
            record: {
                prop1: string;
                optional: Opt<nat64>;
                variant: Variant<{ v1: null; v2: null }>;
            },
            variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>,
            func: Func<
                () => Query<{
                    prop1: string;
                    variant: Variant<{ v1: null; v2: { prop1: string } }>;
                }>
            >
        ) => Query<void>
    >
): Query<
    Func<
        (
            primitive: string,
            opt: Opt<{
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: { prop1: string };
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<() => Update<string>>;
            }>,
            vec: {
                primitive: nat;
                opt: Opt<string>;
                vec: string[];
                record: { prop1: string };
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<() => Update<string>>;
            }[],
            record: {
                prop1: string;
                optional: Opt<nat64>;
                variant: Variant<{ v1: null; v2: null }>;
            },
            variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>,
            func: Func<
                () => Query<{
                    prop1: string;
                    variant: Variant<{ v1: null; v2: { prop1: string } }>;
                }>
            >
        ) => Query<void>
    >
> {
    return callback;
}

export function complex(record: {
    primitive: string;
    opt: Opt<{
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<() => Update<string>>;
    }>;
    vec: {
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<() => Update<string>>;
    }[];
    record: {
        prop1: string;
        optional: Opt<nat64>;
        variant: Variant<{ v1: null; v2: null }>;
    };
    variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>;
    func: Func<
        () => Query<{
            prop1: string;
            variant: Variant<{ v1: null; v2: { prop1: string } }>;
        }>
    >;
}): Query<{
    primitive: string;
    opt: Opt<{
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<() => Update<string>>;
    }>;
    vec: {
        primitive: nat;
        opt: Opt<string>;
        vec: string[];
        record: { prop1: string };
        variant: Variant<{ v1: null; v2: null }>;
        func: Func<() => Update<string>>;
    }[];
    record: {
        prop1: string;
        optional: Opt<nat64>;
        variant: Variant<{ v1: null; v2: null }>;
    };
    variant: Variant<{ v1: null; v2: null; v3: { prop1: string } }>;
    func: Func<
        () => Query<{
            prop1: string;
            variant: Variant<{ v1: null; v2: { prop1: string } }>;
        }>
    >;
}> {
    return record;
}
