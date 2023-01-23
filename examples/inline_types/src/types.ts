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
    inlineRecordReturnType(): CanisterResult<{
        prop1: string;
        prop2: string;
    }>;
    inlineRecordParam(param: { prop1: string }): CanisterResult<string>;
    inlineVariantReturnType(): CanisterResult<
        Variant<{
            var1: null;
            var2: null;
            var3: null;
        }>
    >;
    inlineVariantParam(
        param: Variant<{ var1: null; var2: null }>
    ): CanisterResult<Variant<{ var1: null; var2: null }>>;
    recordWithInlineFields(): CanisterResult<User1>;
    variantWithInlineFields(): CanisterResult<Reaction>;
    recordReferencingOtherTypesFromReturnType(): CanisterResult<{
        prop1: string;
        prop2: Thing;
    }>;
    variantReferencingOtherTypesFromReturnType(): CanisterResult<
        Variant<{
            prop1: string;
            prop2: Bling;
        }>
    >;
    recordReferencingRecordFromParam(param1: {
        test: Test;
    }): CanisterResult<string>;
    recordReferencingVariantFromParam(param1: {
        testVariant: TestVariant;
    }): CanisterResult<Opt<string>>;
    variantReferencingRecordFromParam(
        param1: Variant<{ prop1: User }>
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
    inlineRecordReturnTypeAsExternalCanisterCall(): CanisterResult<
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
