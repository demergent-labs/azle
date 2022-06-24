import { blob, ic, nat, nat64, Opt, Principal, Query, Update } from 'azle';

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

// returns the amount of cycles available in the canister
export function data_certificate(): Query<Opt<blob>> {
    return ic.data_certificate();
}

// returns the amount of cycles available in the canister
export function data_certificate_null(): Update<Opt<blob>> {
    return ic.data_certificate();
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

// TODO: This should reject with a message, stopping execution. Instead, it
// rejects but continues execution which results in second invalid return
// causing a reject code of 5 instead of 4.
export function reject(message: string): Query<void> {
    ic.reject(message);
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
