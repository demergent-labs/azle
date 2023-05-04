import {
    CallResult,
    Func,
    ic,
    Query,
    Update,
    Opt,
    nat,
    nat64,
    Record,
    Service,
    serviceQuery,
    serviceUpdate,
    Variant,
    Vec
} from 'azle';

export type User1 = Record<{
    id: string;
    job: Record<{
        id: string;
        title: string;
    }>;
}>;

export type Reaction = Variant<{
    one: null;
    two: null;
    three: Record<{
        id: string;
    }>;
}>;

export type Thing = Record<{
    id: string;
}>;

export type Bling = Record<{
    id: string;
}>;

export type Test = Record<{
    id: string;
}>;

type Test1 = Record<{
    id: string;
}>;

export type User = Record<{
    id: string;
}>;

export type UserVariant = Variant<{
    prop1: null;
}>;

export type TestVariant = Variant<{
    prop1: string;
    prop2: Test1;
}>;

export class InlineTypes extends Service {
    @serviceQuery
    inlineRecordReturnType: () => CallResult<
        Record<{
            prop1: string;
            prop2: string;
        }>
    >;

    @serviceQuery
    inlineRecordParam: (param: Record<{ prop1: string }>) => CallResult<string>;

    @serviceQuery
    inlineVariantReturnType: () => CallResult<
        Variant<{
            var1: null;
            var2: null;
            var3: null;
        }>
    >;

    @serviceQuery
    inlineVariantParam: (
        param: Variant<{ var1: null; var2: null }>
    ) => CallResult<Variant<{ var1: null; var2: null }>>;

    @serviceQuery
    recordWithInlineFields: () => CallResult<User1>;

    @serviceQuery
    variantWithInlineFields: () => CallResult<Reaction>;

    @serviceQuery
    recordReferencingOtherTypesFromReturnType: () => CallResult<
        Record<{
            prop1: string;
            prop2: Thing;
        }>
    >;

    @serviceQuery
    variantReferencingOtherTypesFromReturnType: () => CallResult<
        Variant<{
            prop1: string;
            prop2: Bling;
        }>
    >;

    @serviceQuery
    recordReferencingRecordFromParam: (
        param1: Record<{
            test: Test;
        }>
    ) => CallResult<string>;

    @serviceQuery
    recordReferencingVariantFromParam: (
        param1: Record<{
            testVariant: TestVariant;
        }>
    ) => CallResult<Opt<string>>;

    @serviceQuery
    variantReferencingRecordFromParam: (
        param1: Variant<{ prop1: User }>
    ) => CallResult<void>;

    @serviceQuery
    variantReferencingVariantFromParam: (
        param1: Variant<{ prop1: UserVariant }>
    ) => CallResult<void>;

    @serviceUpdate
    stableMapInsert: (
        key: Record<{
            prop1: Opt<string>;
            prop2: Variant<{ var1: null; var2: TestVariant }>;
            prop3: Opt<Record<{ prop1: nat }>>;
        }>,
        value: Record<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>
    ) => CallResult<
        Opt<
            Record<{
                variant: Variant<{ var1: null; var2: TestVariant }>;
            }>
        >
    >;

    @serviceQuery
    stableMapGet: (
        key: Record<{
            prop1: Opt<string>;
            prop2: Variant<{ var1: null; var2: TestVariant }>;
            prop3: Opt<Record<{ prop1: nat }>>;
        }>
    ) => CallResult<
        Opt<
            Record<{
                variant: Variant<{ var1: null; var2: TestVariant }>;
            }>
        >
    >;

    @serviceQuery
    inlineFunc: (
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
    ) => CallResult<
        Func<
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
    >;

    @serviceUpdate
    inlineRecordReturnTypeAsExternalCanisterCall: () => CallResult<
        Variant<{
            ok: Record<{
                prop1: string;
                prop2: string;
            }>;
            err: string;
        }>
    >;

    @serviceQuery
    complex: (
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
            variant: Variant<{
                v1: null;
                v2: null;
                v3: Record<{ prop1: string }>;
            }>;
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
    ) => CallResult<
        Record<{
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
            variant: Variant<{
                v1: null;
                v2: null;
                v3: Record<{ prop1: string }>;
            }>;
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
    >;
}

export let self = new InlineTypes(ic.id());
