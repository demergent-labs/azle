import {
    Query,
    nat64,
    ic,
    Principal
} from 'azle';

// returns the principal of the identity that called this function
export function caller(): Query<string> {
    return ic.caller();
}

// returns the amount of cycles available in the canister
export function canisterBalance(): Query<nat64> {
    return ic.canisterBalance();
}

// returns this canister's id
export function id(): Query<Principal> {
    return ic.id();
}

// prints a message through the local replica's output
export function print(message: string): Query<boolean> {
    ic.print(message);

    return true;
}

// returns the current timestamp
export function time(): Query<nat64> {
    return ic.time();
}

// traps with a message, stopping execution and discarding all state within the call
export function trap(message: string): Query<boolean> {
    ic.trap(message);

    return true;
}