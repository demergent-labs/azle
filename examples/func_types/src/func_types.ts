// TODO do we need inline funcs?
// TODO make this example much more elaborate

import {
    Canister,
    CanisterResult,
    Func,
    nat64,
    Oneway,
    Query,
    Stable,
    Update,
    Variant
} from 'azle';

// TODO we might want to do some cross-canister calls to test this
type TestCanister = Canister<{
    get_callback(): CanisterResult<OnewayFunc>; // TODO this func type needs to be found out...
}>;

type TestStable = Stable<{
    callback: StableFunc;
}>;

type User = {
    id: string;
    basic_func: BasicFunc;
    // complex_func: ComplexFunc; // TODO https://github.com/dfinity/candid/issues/347
};

type Reaction = Variant<{
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    // ComplexFunc: ComplexFunc; // TODO https://github.com/dfinity/candid/issues/347
}>;

type BasicFunc = Func<(param1: string) => Query<string>>;

// TODO referencing yourself in a fun is difficult to deal with somewhat...wait for this: https://github.com/dfinity/candid/issues/347
// type ComplexFunc = Func<(user: User, reaction: Reaction) => CanisterResult<nat64>>;
type ComplexFunc = Func<(user: User, reaction: Reaction) => Update<nat64>>;

type OnewayFunc = Func<(param1: nat64) => Oneway<void>>;

type StableFunc = Func<(param1: nat64, param2: string) => Query<void>>;

export function basic_func_param(basic_func: BasicFunc): Query<BasicFunc> {
    return basic_func;
}

export function basic_func_return_type(): Query<BasicFunc> {
    return [
        'aaaaa-aa',
        'create_canister'
    ];
}

export function complex_func_param(complex_func: ComplexFunc): Query<ComplexFunc> {
    return complex_func
}

export function complex_func_return_type(): Query<ComplexFunc> {
    return [
        'aaaaa-aa',
        'stop_canister'
    ];
}