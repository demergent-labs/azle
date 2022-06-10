import {
    ic,
    nat,
    nat64,
    Principal,
    Query,
    Update
} from 'azle';

// returns the principal of the identity that called this function
export function caller(): Query<Principal> {
    return ic.caller();
}

// returns the amount of cycles available in the canister
export function canister_balance(): Query<nat64> {
    return ic.canister_balance();
}

// returns the amount of cycles available in the canister
export function canister_balance128(): Query<nat> {
    return ic.canister_balance128();
}

// returns this canister's id
export function id(): Query<Principal> {
    return ic.id();
}

// TODO under what conditions can this method be called?
export function method_name(): Update<string> {
    return ic.method_name();
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