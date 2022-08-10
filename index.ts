import { Principal } from '@dfinity/principal';

// TODO it would be great if we could allow importing this file (azle bare specifier) into frontends or Node.js
// TODO but it isn't quite set up to do that right now

declare var globalThis: any;

export const ic: ic = globalThis.ic;

// TODO perhaps this should just be provided through calling
// TODO the management canister
// ic.rawRand = function() {
//     return {
//         name: 'rawRand'
//     } as any;
// };

// TODO this needs to be included in all code even if the user has not imported anything concrete from azle
// globalThis.console = {
//     ...globalThis.console,
//     log: (...args: any[]) => {
//         console.log(...args);
//     }
// };

ic.stable_storage = function () {
    return (ic as any)._azle_stable_storage;
};

// ic.call = function* (...args) {
//     return yield {
//         name: 'call',
//         args: [
//             arguments.callee.name,
//             ...args
//         ]
//     } as any;
// };

// TODO: See https://github.com/demergent-labs/azle/issues/496

/**
 * Working declaration for `ic.result`. This is NOT the API we want, but at
 * least it works.'
 * Note: make sure to use in conjunction with it's type on the IC type below
 */
// ic.result = function <T>(canisterResult: AzleResult<T>): AzleResult<T> {
//     if ('NoError' in ic.reject_code()) {
//         return {
//             ok: canisterResult.ok
//         };
//     }
//     return {
//         err: ic.reject_message()
//     };
// };

/**
 * Non-working declaration for `ic.result`. This is the API we want, but it
 * doesn't work.
 * Note: make sure to use in conjunction with it's type on the IC type below
 */
// ic.result = function <T>(): AzleResult<Array<T>> {
//     if ('NoError' in ic.reject_code()) {
//         return {
//             ok: ic.arg_data() // Currently errors out.
//         };
//     }
//     return {
//         err: ic.reject_message()
//     };
// };

ic.call_raw = function (...args) {
    return {
        name: 'call_raw',
        args
    } as any;
};

ic.call_raw128 = function (...args) {
    return {
        name: 'call_raw128',
        args
    } as any;
};

type ic = {
    accept_message: () => void;
    // arg_data: () => any[]; // TODO: See https://github.com/demergent-labs/azle/issues/496
    arg_data_raw: () => blob;
    arg_data_raw_size: () => nat32;
    // call: (
    //     canisterId: Principal,
    //     methodName: string,
    //     ...args: any[]
    // ) => Generator; // TODO improve type inference here, try to get rid of the type parameters
    call_raw: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat64
    ) => CanisterResult<blob>;
    call_raw128: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat
    ) => CanisterResult<blob>;
    caller: () => Principal;
    candid_decode: (candid_encoded: blob) => string;
    candid_encode: (candid_string: string) => blob;
    canisters: {
        [canisterName: string]: <T>(canisterId: Principal) => T;
    };
    canister_balance: () => nat64;
    canister_balance128: () => nat;
    data_certificate: () => Opt<blob>;
    id: () => Principal;
    method_name: () => string;
    msg_cycles_accept: (max_amount: nat64) => nat64;
    msg_cycles_accept128: (max_amount: nat) => nat;
    msg_cycles_available: () => nat64;
    msg_cycles_available128: () => nat;
    msg_cycles_refunded: () => nat64;
    msg_cycles_refunded128: () => nat;
    notify_raw: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat
    ) => CanisterResult<null>;
    performance_counter: (counter_type: nat32) => nat64;
    print: (...args: any) => void;
    reject: (message: string) => void;
    reject_code: () => RejectionCode;
    reject_message: () => string;
    reply: (reply: any) => void;
    reply_raw: (buf: blob) => void;
    /** Working type declaration. Not the API we want though */
    // result: <T>(canisterResult: AzleResult<T>) => AzleResult<T>;
    /** Non-working type declaration. But API we want */
    // result: <T>() => AzleResult<Array<T>>;
    set_certified_data: (data: blob) => void;
    stable_bytes: () => blob;
    stable_grow: (new_pages: nat32) => StableGrowResult;
    stable_read: (offset: nat32, length: nat32) => blob;
    stable_size: () => nat32;
    stable_write: (offset: nat32, buf: blob) => void;
    stable64_grow: (new_pages: nat64) => Stable64GrowResult;
    stable64_read: (offset: nat64, length: nat64) => blob;
    stable64_size: () => nat64;
    stable64_write: (offset: nat64, buffer: blob) => void;
    stable_storage: <T>() => T;
    time: () => nat64;
    trap: (message: string) => never;
};

export type Migrate<T> = T;
export type PreUpgrade = void;
export type PostUpgrade = void;
export type Heartbeat = void | Generator;
export type Init = void;
export type InspectMessage = void;
export type Query<T> = T;
export type QueryManual<T> = void;
export type Update<T> = T | Generator<any, T, any>;
export type UpdateManual<T> = void | Generator<any, void, any>;
export type Oneway = void;
// TODO the generator types are not exactly correct...but at least I've given the user the Async type
export type Async<T> = Generator<any, T, any>; // TODO to be stricter we may want the last parameter to be unknown: https://github.com/demergent-labs/azle/issues/138

// TODO see if we can get the T here to have some more information, like the func type
// TODO we especially want to add the possibility of an optional cycle parameter and the notify method
export type Canister<T> = T;

export type Variant<T> = Partial<T>;
export type Opt<T> = T | null;
// export type Result<T, V> = {
//     ok?: T;
//     err?: V;
// };
// export type CallResult<T> = Generator<
//     any,
//     Variant<{
//         ok?: T;
//         err?: string;
//     }>,
//     any
// >;
// export type CallResult<T> = Variant<{
//     ok?: T;
//     err?: string;
// }>;
export type CanisterResult<T> = {
    ok?: T;
    err?: string;
    notify: () => CanisterResult<null>;
    with_cycles: (cycles: nat64) => CanisterResult<T>;
    with_cycles128: (cycles: nat) => CanisterResult<T>;
};
export type Stable<T> = T;

export type int = bigint;
export type int64 = bigint;
export type int32 = number;
export type int16 = number;
export type int8 = number;

export type nat = bigint;
export type nat64 = bigint;
export type nat32 = number;
export type nat16 = number;
export type nat8 = number;

export type float32 = number;
export type float64 = number;

export type blob = Uint8Array;

export type reserved = any;
export type empty = never;

type AzleResult<T> = Variant<{
    ok: T;
    err: string;
}>;

type Ok<T> = {
    ok: NonNullable<T>;
};

export function ok<T>(azle_result: AzleResult<T>): azle_result is Ok<T> {
    if (azle_result.err === undefined) {
        return true;
    } else {
        return false;
    }
}

// TODO working on turning the ok function into an assertion
export function attempt<T>(callback: () => AzleResult<T>): AzleResult<T> {
    try {
        return callback();
    } catch (error) {
        return error as AzleResult<T>;
    }
}

// TODO type this more strictly
export type Func<
    T extends (...args: any[]) => Query<any> | Update<any> | Oneway
> = [Principal, string];

export { Principal } from '@dfinity/principal';

export type RejectionCode = Variant<{
    NoError: null;
    SysFatal: null;
    SysTransient: null;
    DestinationInvalid: null;
    CanisterReject: null;
    CanisterError: null;
    Unknown: null;
}>;

export type StableMemoryError = Variant<{
    OutOfMemory: null;
    OutOfBounds: null;
}>;

export type StableGrowResult = Variant<{
    ok: nat32;
    err: StableMemoryError;
}>;

export type Stable64GrowResult = Variant<{
    ok: nat64;
    err: StableMemoryError;
}>;
