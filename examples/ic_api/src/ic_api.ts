import {
    blob,
    empty,
    ic,
    int8,
    Manual,
    nat,
    nat32,
    nat64,
    Opt,
    Principal,
    $query,
    $update
} from 'azle';

// TODO: See https://github.com/demergent-labs/azle/issues/496
// type ArgDataMultipleParamsResult = {
//     blob: blob;
//     int: int8;
//     boolean: boolean;
//     string: string;
// };

// // returns the argument data as an array.
// export function arg_data_zero_params(): null[] {
//     return ic.arg_data();
// }
//
// // returns the argument data as an array.
// export function arg_data_one_param(arg: boolean): boolean {
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
// ): ArgDataMultipleParamsResult {
//     const arg_data = ic.arg_data();
//     return {
//         blob: Uint8Array.from(arg_data[0]),
//         int: arg_data[1],
//         boolean: arg_data[2],
//         string: arg_data[3]
//     };
// }

// returns the argument data as bytes.
$query;
export function arg_data_raw(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): blob {
    return ic.arg_data_raw();
}

// returns the length of the argument data in bytes
$query;
export function arg_data_raw_size(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): nat32 {
    return ic.arg_data_raw_size();
}

// returns the principal of the identity that called this function
$query;
export function caller(): Principal {
    return ic.caller();
}

// returns the amount of cycles available in the canister
$query;
export function canister_balance(): nat64 {
    return ic.canister_balance();
}

// returns the amount of cycles available in the canister
$query;
export function canister_balance128(): nat {
    return ic.canister_balance128();
}

// When called from a query call, returns the data certificate authenticating certified_data set by this canister. Returns None if called not from a query call.
$query;
export function data_certificate(): Opt<blob> {
    return ic.data_certificate();
}

// When called from a query call, returns the data certificate authenticating certified_data set by this canister. Returns None if called not from a query call.
$update;
export function data_certificate_null(): Opt<blob> {
    return ic.data_certificate();
}

// returns this canister's id
$query;
export function id(): Principal {
    return ic.id();
}

$query;
export function performance_counter(): nat64 {
    return ic.performance_counter(0);
}

// prints a message through the local replica's output
$query;
export function print(message: string): boolean {
    ic.print(message);

    return true;
}

$query;
export function reject(message: string): Manual<empty> {
    ic.reject(message);
}

// sets up to 32 bytes of certified data
$update;
export function set_certified_data(data: blob): void {
    ic.set_certified_data(data);
}

// returns the current timestamp
$query;
export function time(): nat64 {
    return ic.time();
}

// traps with a message, stopping execution and discarding all state within the call
$query;
export function trap(message: string): boolean {
    ic.trap(message);

    return true;
}
