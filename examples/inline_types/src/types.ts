import {
    CanisterResult,
    ExternalCanister,
    InsertError,
    Func,
    FuncQuery,
    FuncUpdate,
    Opt,
    Principal,
    nat,
    nat64,
    query,
    update,
    Variant
} from 'azle';

export type User1 = {
    id: string;
    job: {
        id: string;
        title: string;
    };
};

export type Reaction = Variant<{
    one: null;
    two: null;
    three: {
        id: string;
    };
}>;

export type Thing = {
    id: string;
};

export type Bling = {
    id: string;
};

export type Test = {
    id: string;
};

type Test1 = {
    id: string;
};

export type User = {
    id: string;
};

export type UserVariant = Variant<{
    prop1: null;
}>;

export type TestVariant = Variant<{
    prop1: string;
    prop2: Test1;
}>;

export type InlineTypesOld = Canister<{
    inline_record_return_type(): CanisterResult<{
        prop1: string;
        prop2: string;
    }>;
    inline_record_param(param: { prop1: string }): CanisterResult<string>;
    inline_variant_return_type(): CanisterResult<
        Variant<{
            var1: null;
            var2: null;
            var3: null;
        }>
    >;
    inline_variant_param(
        param: Variant<{ var1: null; var2: null }>
    ): CanisterResult<Variant<{ var1: null; var2: null }>>;
    record_with_inline_fields(): CanisterResult<User1>;
    variant_with_inline_fields(): CanisterResult<Reaction>;
    record_referencing_other_types_from_return_type(): CanisterResult<{
        prop1: string;
        prop2: Thing;
    }>;
    variant_referencing_other_types_from_return_type(): CanisterResult<
        Variant<{
            prop1: string;
            prop2: Bling;
        }>
    >;
    record_referencing_record_from_param(param1: {
        test: Test;
    }): CanisterResult<string>;
    record_referencing_variant_from_param(param1: {
        testVariant: TestVariant;
    }): CanisterResult<Opt<string>>;
    variant_referencing_record_from_param(
        param1: Variant<{ prop1: User }>
    ): CanisterResult<void>;
    variant_referencing_variant_from_param(
        param1: Variant<{ prop1: UserVariant }>
    ): CanisterResult<void>;
    stable_map_insert(
        key: {
            prop1: Opt<string>;
            prop2: Variant<{ var1: null; var2: TestVariant }>;
            prop3: Opt<{ prop1: nat }>;
        },
        value: {
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }
    ): CanisterResult<
        Variant<{
            ok: Opt<{
                variant: Variant<{ var1: null; var2: TestVariant }>;
            }>;
            err: InsertError;
        }>
    >;
    stable_map_get(key: {
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<{ prop1: nat }>;
    }): CanisterResult<
        Opt<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>
    >;
    inline_func(
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
    ): CanisterResult<
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
    >;
    inline_record_return_type_as_external_canister_call(): CanisterResult<
        Variant<{
            ok: {
                prop1: string;
                prop2: string;
            };
            err: string;
        }>
    >;
    complex(record: {
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
    }): CanisterResult<{
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
    }>;
}>;

export class InlineTypes extends ExternalCanister {
    @query
    inline_record_return_type: () => CanisterResult<{
        prop1: string;
        prop2: string;
    }>;

    @query
    inline_record_param: (param: { prop1: string }) => CanisterResult<string>;

    @query
    inline_variant_return_type: () => CanisterResult<
        Variant<{
            var1: null;
            var2: null;
            var3: null;
        }>
    >;

    @query
    inline_variant_param: (
        param: Variant<{ var1: null; var2: null }>
    ) => CanisterResult<Variant<{ var1: null; var2: null }>>;

    @query
    record_with_inline_fields: () => CanisterResult<User1>;

    @query
    variant_with_inline_fields: () => CanisterResult<Reaction>;

    @query
    record_referencing_other_types_from_return_type: () => CanisterResult<{
        prop1: string;
        prop2: Thing;
    }>;

    @query
    variant_referencing_other_types_from_return_type: () => CanisterResult<
        Variant<{
            prop1: string;
            prop2: Bling;
        }>
    >;

    @query
    record_referencing_record_from_param: (param1: {
        test: Test;
    }) => CanisterResult<string>;

    @query
    record_referencing_variant_from_param: (param1: {
        testVariant: TestVariant;
    }) => CanisterResult<Opt<string>>;

    @query
    variant_referencing_record_from_param: (
        param1: Variant<{ prop1: User }>
    ) => CanisterResult<void>;

    @query
    variant_referencing_variant_from_param: (
        param1: Variant<{ prop1: UserVariant }>
    ) => CanisterResult<void>;

    @update
    stable_map_insert: (
        key: {
            prop1: Opt<string>;
            prop2: Variant<{ var1: null; var2: TestVariant }>;
            prop3: Opt<{ prop1: nat }>;
        },
        value: {
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }
    ) => CanisterResult<
        Variant<{
            ok: Opt<{
                variant: Variant<{ var1: null; var2: TestVariant }>;
            }>;
            err: InsertError;
        }>
    >;

    @query
    stable_map_get: (key: {
        prop1: Opt<string>;
        prop2: Variant<{ var1: null; var2: TestVariant }>;
        prop3: Opt<{ prop1: nat }>;
    }) => CanisterResult<
        Opt<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>
    >;

    @query
    inline_func: (
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
                    variant: Variant<{
                        v1: null;
                        v2: null;
                        v3: { prop1: string };
                    }>,
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
    ) => CanisterResult<
        Func<
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
                    variant: Variant<{
                        v1: null;
                        v2: null;
                        v3: { prop1: string };
                    }>,
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
    >;

    @update
    inline_record_return_type_as_external_canister_call: () => CanisterResult<
        Variant<{
            ok: {
                prop1: string;
                prop2: string;
            };
            err: string;
        }>
    >;

    @query
    complex: (record: {
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
    }) => CanisterResult<{
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
    }>;
}

export let self = new InlineTypes(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
