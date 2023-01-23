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
