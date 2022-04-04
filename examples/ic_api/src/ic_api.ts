import {
    Query,
    UpdateAsync,
    nat64,
    nat8,
    ic,
    Principal
} from 'azle';

export function caller(): Query<string> {
    return ic.caller();
}

export function canisterBalance(): Query<nat64> {
    return ic.canisterBalance();
}

export function id(): Query<Principal> {
    return ic.id();
}

// TODO consider how we can do a simple unit test for this
export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}

// TODO consider how we can do a simple unit test for this
export function* rawRand(): UpdateAsync<nat8[]> {
    return yield ic.rawRand();
}

// TODO consider how we can do a simple unit test for this
export function time(): Query<nat64> {
    return ic.time();
}

// TODO consider how we can do a simple unit test for this
export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}