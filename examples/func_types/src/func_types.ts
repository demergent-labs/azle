// TODO do we need inline funcs?
// TODO make this example much more elaborate

import {
    Canister,
    CanisterResult,
    Func,
    nat64,
    Oneway,
    Principal,
    Query,
    Stable,
    Update,
    Variant
} from 'azle';

// TODO we might want to do some cross-canister calls to test this
// type TestCanister = Canister<{
//     get_callback(): CanisterResult<OnewayFunc>; // TODO this func type needs to be found out...
// }>;

// type TestStable = Stable<{
//     callback: StableFunc;
// }>;

type User = {
    id: string;
    basic_func: BasicFunc;
    complex_func: ComplexFunc;
};

type Reaction = Variant<{
    Good: null;
    Bad: null;
    BasicFunc: BasicFunc;
    ComplexFunc: ComplexFunc;
}>;

type BasicFunc = Func<(param1: string) => Query<string>>;
type ComplexFunc = Func<(user: User, reaction: Reaction) => Update<nat64>>;

// type OnewayFunc = Func<(param1: nat64) => Oneway<void>>;
// type StableFunc = Func<(param1: nat64, param2: string) => Query<void>>;

export function basic_func_param(basic_func: BasicFunc): Query<BasicFunc> {
    return basic_func;
}

export function basic_func_return_type(): Query<BasicFunc> {
    return [Principal.fromText('aaaaa-aa'), 'create_canister'];
}

export function complex_func_param(
    complex_func: ComplexFunc
): Query<ComplexFunc> {
    return complex_func;
}

export function complex_func_return_type(): Query<ComplexFunc> {
    return [Principal.fromText('aaaaa-aa'), 'stop_canister'];
}
