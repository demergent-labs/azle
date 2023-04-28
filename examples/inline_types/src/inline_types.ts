import {
    $query,
    $update,
    Func,
    nat,
    nat64,
    Opt,
    Query,
    Record,
    StableBTreeMap,
    Update,
    Variant,
    Vec
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
export function inlineRecordReturnType(): Record<{
    prop1: string;
    prop2: string;
}> {
    return {
        prop1: 'prop1',
        prop2: 'prop2'
    };
}

$query;
export function inlineRecordParam(param: Record<{ prop1: string }>): string {
    return param.prop1;
}

$query;
export function inlineVariantReturnType(): Variant<{
    var1: null;
    var2: null;
    var3: null;
}> {
    return {
        var1: null
    };
}

$query;
export function inlineVariantParam(
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
export function recordWithInlineFields(): User1 {
    return {
        id: '0',
        job: {
            id: '0',
            title: 'Software Developer'
        }
    };
}

$query;
export function variantWithInlineFields(): Reaction {
    return {
        three: {
            id: '0'
        }
    };
}

$query;
export function recordReferencingOtherTypesFromReturnType(): Record<{
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
export function variantReferencingOtherTypesFromReturnType(): Variant<{
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
export function recordReferencingRecordFromParam(
    param1: Record<{
        test: Test;
    }>
): string {
    return param1.test.id;
}

$query;
export function recordReferencingVariantFromParam(
    param1: Record<{
        testVariant: TestVariant;
    }>
): Opt<string> {
    if (param1.testVariant.prop1 !== undefined) {
        return Opt.Some(param1.testVariant.prop1);
    }

    return Opt.None;
}

$query;
export function variantReferencingRecordFromParam(
    param1: Variant<{ prop1: User }>
): void {}

$query;
export function variantReferencingVariantFromParam(
    param1: Variant<{ prop1: UserVariant }>
): void {}

let stableMap = new StableBTreeMap<
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
export function stableMapInsert(
    key: Record<{
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<Record<{ prop1: nat }>>;
    }>,
    value: Record<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
): Opt<
    Record<{
        variant: Variant<{ var1: null; var2: TestVariant }>;
    }>
> {
    return stableMap.insert(key, value);
}

$query;
export function stableMapGet(
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
    return stableMap.get(key);
}

$update;
export async function inlineRecordReturnTypeAsExternalCanisterCall(): Promise<
    Variant<{
        Ok: Record<{
            prop1: string;
            prop2: string;
        }>;
        Err: string;
    }>
> {
    return await self.inlineRecordReturnType().call();
}

$query;
export function inlineFunc(
    callback: Func<
        Query<
            (
                primitive: string,
                opt: Opt<
                    Record<{
                        primitive: nat;
                        opt: Opt<string>;
                        vec: Vec<string>;
                        record: Record<{ prop1: string }>;
                        variant: Variant<{ v1: null; v2: null }>;
                        func: Func<Update<() => string>>;
                    }>
                >,
                vec: Vec<
                    Record<{
                        primitive: nat;
                        opt: Opt<string>;
                        vec: Vec<string>;
                        record: Record<{ prop1: string }>;
                        variant: Variant<{ v1: null; v2: null }>;
                        func: Func<Update<() => string>>;
                    }>
                >,
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
                    vec: Vec<string>;
                    record: Record<{ prop1: string }>;
                    variant: Variant<{ v1: null; v2: null }>;
                    func: Func<Update<() => string>>;
                }>
            >,
            vec: Vec<
                Record<{
                    primitive: nat;
                    opt: Opt<string>;
                    vec: Vec<string>;
                    record: Record<{ prop1: string }>;
                    variant: Variant<{ v1: null; v2: null }>;
                    func: Func<Update<() => string>>;
                }>
            >,
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
                vec: Vec<string>;
                record: Record<{ prop1: string }>;
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<Update<() => string>>;
            }>
        >;
        vec: Vec<
            Record<{
                primitive: nat;
                opt: Opt<string>;
                vec: Vec<string>;
                record: Record<{ prop1: string }>;
                variant: Variant<{ v1: null; v2: null }>;
                func: Func<Update<() => string>>;
            }>
        >;
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
            vec: Vec<string>;
            record: Record<{ prop1: string }>;
            variant: Variant<{ v1: null; v2: null }>;
            func: Func<Update<() => string>>;
        }>
    >;
    vec: Vec<
        Record<{
            primitive: nat;
            opt: Opt<string>;
            vec: Vec<string>;
            record: Record<{ prop1: string }>;
            variant: Variant<{ v1: null; v2: null }>;
            func: Func<Update<() => string>>;
        }>
    >;
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
