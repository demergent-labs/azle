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
// export function argDataZeroParams(): Vec<null> {
//     return ic.argData();
// }
//
// // returns the argument data as an array.
// export function argDataOneParam(arg: boolean): boolean {
//     const argData = ic.argData();
//     return argData[0];
// }
//
// // returns the argument data as an array.
// export function argDataMultipleParams(
//     arg1: blob,
//     arg2: int8,
//     arg3: boolean,
//     arg4: string
// ): ArgDataMultipleParamsResult {
//     const argData = ic.argData();
//     return {
//         blob: Uint8Array.from(argData[0]),
//         int: argData[1],
//         boolean: argData[2],
//         string: argData[3]
//     };
// }

// returns the argument data as bytes.
$query;
export function argDataRaw(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): blob {
    return ic.argDataRaw();
}

// returns the length of the argument data in bytes
$query;
export function argDataRawSize(
    arg1: blob,
    arg2: int8,
    arg3: boolean,
    arg4: string
): nat32 {
    return ic.argDataRawSize();
}

// returns the principal of the identity that called this function
$query;
export function caller(): Principal {
    return ic.caller();
}

// returns the amount of cycles available in the canister
$query;
export function canisterBalance(): nat64 {
    return ic.canisterBalance();
}

// returns the amount of cycles available in the canister
$query;
export function canisterBalance128(): nat {
    return ic.canisterBalance128();
}

// When called from a query call, returns the data certificate authenticating certified data set by this canister. Returns None if not called from a query call.
$query;
export function dataCertificate(): Opt<blob> {
    return ic.dataCertificate();
}

// When called from a query call, returns the data certificate authenticating certified data set by this canister. Returns None if called not from a query call.
$update;
export function dataCertificateNull(): Opt<blob> {
    return ic.dataCertificate();
}

// returns this canister's id
$query;
export function id(): Principal {
    return ic.id();
}

$query;
export function performanceCounter(): nat64 {
    return ic.performanceCounter(0);
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
export function setCertifiedData(data: blob): void {
    ic.setCertifiedData(data);
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
