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

// TODO only available on dfx 0.10.2-btcbeta.0
// TODO run this command to test: DFX_VERSION="0.10.2-btcbeta.0" sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
// TODO we also have to install gzip Wasm binaries locally now
// TODO gzip installation documentation: https://internetcomputer.org/docs/current/developer-docs/deploy/larger-wasm
export function performance_counter(): Query<nat64> {
    return ic.performance_counter(0);
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
