import {
    blob,
    empty,
    ic,
    int8,
    nat,
    nat32,
    nat64,
    Opt,
    Principal,
    Query,
    QueryManual,
    Update
} from 'azle';

// TODO: See https://github.com/demergent-labs/azle/issues/496
// type ArgDataMultipleParamsResult = {
//     blob: blob;
//     int: int8;
//     boolean: boolean;
//     string: string;
// };

// // returns the argument data as an array.
// export function arg_data_zero_params(): Query<null[]> {
//     return ic.arg_data();
// }
//
// // returns the argument data as an array.
// export function arg_data_one_param(arg: boolean): Query<boolean> {
//     const arg_data = ic.arg_data();
//     return arg_data[0];
// }
//
// // returns the argument data as an array.
// export function arg_data_multiple_params(
//     arg1: blob,
//     arg2: int8,
//     arg3: boolean,
//     arg4: string
// ): Query<ArgDataMultipleParamsResult> {
//     const arg_data = ic.arg_data();
//     return {
//         blob: Uint8Array.from(arg_data[0]),
//         int: arg_data[1],
//         boolean: arg_data[2],
//         string: arg_data[3]
//     };
// }

// returns the argument data as bytes.
export function arg_data_raw(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): Query<blob> {
    return ic.arg_data_raw();
}

// returns the length of the argument data in bytes
export function arg_data_raw_size(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): Query<nat32> {
    return ic.arg_data_raw_size();
}

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

export function reject(message: string): QueryManual<empty> {
    ic.reject(message);
}

// sets up to 32 bytes of certified data
export function set_certified_data(data: blob): Update<void> {
    ic.set_certified_data(data);
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
