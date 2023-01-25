import {
    Canister,
    CanisterResult,
    ic,
    InsertError,
    Variant,
    Opt,
    Principal
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

export type InlineTypes = Canister<{
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
        key: string,
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
    stable_map_get(key: string): CanisterResult<
        Opt<{
            variant: Variant<{ var1: null; var2: TestVariant }>;
        }>
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
}>;

export let self = ic.canisters.InlineTypes<InlineTypes>(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);
