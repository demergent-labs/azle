import {
    CanisterResult,
    InsertError,
    Func,
    Query,
    Update,
    Opt,
    Principal,
    nat,
    nat64,
    Record,
    Service,
    serviceQuery,
    serviceUpdate,
    Variant
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
    inlineRecordReturnType: () => CanisterResult<
        Record<{
            prop1: string;
            prop2: string;
        }>
    >;

    @serviceQuery
    inlineRecordParam: (
        param: Record<{ prop1: string }>
    ) => CanisterResult<string>;

    @serviceQuery
    inlineVariantReturnType: () => CanisterResult<
        Variant<{
            var1: null;
            var2: null;
            var3: null;
        }>
    >;

    @serviceQuery
    inlineVariantParam: (
        param: Variant<{ var1: null; var2: null }>
    ) => CanisterResult<Variant<{ var1: null; var2: null }>>;

    @serviceQuery
    recordWithInlineFields: () => CanisterResult<User1>;

    @serviceQuery
    variantWithInlineFields: () => CanisterResult<Reaction>;

    @serviceQuery
    recordReferencingOtherTypesFromReturnType: () => CanisterResult<
        Record<{
            prop1: string;
            prop2: Thing;
        }>
    >;

    @serviceQuery
    variantReferencingOtherTypesFromReturnType: () => CanisterResult<
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
    ) => CanisterResult<string>;

    @serviceQuery
    recordReferencingVariantFromParam: (
        param1: Record<{
            testVariant: TestVariant;
        }>
    ) => CanisterResult<Opt<string>>;

    @serviceQuery
    variantReferencingRecordFromParam: (
        param1: Variant<{ prop1: User }>
    ) => CanisterResult<void>;

    @serviceQuery
    variantReferencingVariantFromParam: (
        param1: Variant<{ prop1: UserVariant }>
    ) => CanisterResult<void>;

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
    ) => CanisterResult<
        Variant<{
            ok: Opt<
                Record<{
                    variant: Variant<{ var1: null; var2: TestVariant }>;
                }>
            >;
            err: InsertError;
        }>
    >;

    @serviceQuery
    stableMapGet: (
        key: Record<{
            prop1: Opt<string>;
            prop2: Variant<{ var1: null; var2: TestVariant }>;
            prop3: Opt<Record<{ prop1: nat }>>;
        }>
    ) => CanisterResult<
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
    ) => CanisterResult<
        Func<
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
    >;

    @serviceUpdate
    inlineRecordReturnTypeAsExternalCanisterCall: () => CanisterResult<
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
    ) => CanisterResult<
        Record<{
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

export let self = new InlineTypes(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
