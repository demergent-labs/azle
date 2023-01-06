import { Principal } from '@dfinity/principal';

declare var globalThis: any;

export const ic: ic = globalThis.ic ?? {};

ic.stable_storage = function () {
    (ic as any)._azle_stable_storage._azle_initialized = true;
    return (ic as any)._azle_stable_storage;
};

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

type ic = {
    accept_message: () => void;
    // arg_data: () => any[]; // TODO: See https://github.com/demergent-labs/azle/issues/496
    arg_data_raw: () => blob;
    arg_data_raw_size: () => nat32;
    call_raw: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat64
    ) => Promise<CanisterResult<blob>>;
    call_raw128: (
        canister_id: Principal,
        method: string,
        args_raw: blob,
        payment: nat
    ) => Promise<CanisterResult<blob>>;
    caller: () => Principal;
    candid_decode: (candid_encoded: blob) => string;
    candid_encode: (candid_string: string) => blob;
    canisters: {
        [canisterName: string]: <T>(canisterId: Principal) => T;
    };
    canister_balance: () => nat64;
    canister_balance128: () => nat;
    /**
     * Cancels an existing timer. Does nothing if the timer has already been canceled.
     * @param id The ID of the timer to be cancelled.
     */
    clear_timer: (id: TimerId) => void;
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
    ) => NotifyResult;
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
    /**
     * Sets callback to be executed later, after delay. Panics if `delay` + time() is more than 2^64 - 1.
     * To cancel the timer before it executes, pass the returned `TimerId` to `clear_timer`.
     * Note that timers are not persisted across canister upgrades.
     *
     * @param delay The time (in seconds) to wait before executing the provided callback.
     * @param callback the function to invoke after the specified delay has passed.
     * @returns the ID of the created timer. Used to cancel the timer.
     */
    set_timer: (delay: Duration, callback: () => void) => TimerId;
    /**
     * Sets callback to be executed every interval. Panics if `interval` + time() is more than 2^64 - 1.
     * To cancel the interval timer, pass the returned `TimerId` to `clear_timer`.
     * Note that timers are not persisted across canister upgrades.
     *
     * @param interval The interval (in seconds) between each callback execution.
     * @param callback the function to invoke after the specified delay has passed.
     * @returns the ID of the created timer. Used to cancel the timer.
     */
    set_timer_interval: (interval: Duration, callback: () => void) => TimerId;
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

export type PreUpgrade = void;
export type PostUpgrade = void;
export type Heartbeat = void;
export type Init = void;
export type InspectMessage = void;
export type Query<T> = T;
export type QueryManual<T> = void;
export type Update<T> = T;
export type UpdateManual<T> = void;
export type Oneway = void;

// TODO see if we can get the T here to have some more information, like the func type
// TODO we especially want to add the possibility of an optional cycle parameter and the notify method
export type Canister<T> = T;

export type Variant<T> = Partial<T>;
export type Opt<T> = T | null;
// export type Result<T, V> = {
//     ok?: T;
//     err?: V;
// };
// export type CallResult<T> = Variant<{
//     ok?: T;
//     err?: string;
// }>;
export type CanisterResult<T> = {
    ok?: T;
    err?: string;
    call: () => Promise<CanisterResult<T>>;
    notify: () => NotifyResult;
    cycles: (cycles: nat64) => CanisterResult<T>;
    cycles128: (cycles: nat) => CanisterResult<T>;
};

export type NotifyResult = Variant<{
    ok: null;
    err: RejectionCode;
}>;

/**
 * Type returned by the `ic.set_timer` and `ic.set_timer_interval` functions. Pass to `ic.clear_timer` to remove the timer.
 */
export type TimerId = nat64; // TODO: Consider modeling this after the corresponding struct in Rust

/**
 * Represents a duration of time in seconds.
 */
export type Duration = nat64; // TODO: Consider modeling this after the corresponding struct in Rust

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

export function stable_storage_serialize<T>(stable_storage: T): string {
    if ((stable_storage as any)._azle_initialized === true) {
        return JSON.stringify(stable_storage, (_, value) => {
            if (typeof value === 'bigint') {
                return `AZLE::BigInt::${value}`;
            }

            if (typeof value === 'undefined') {
                return `AZLE::Undefined`;
            }

            // TODO we should open an issue with Boa, instanceof doesn't work
            if (value?._isPrincipal === true) {
                return `AZLE::Principal::${value.toHex()}`;
            }

            // TODO we should open an issue with Boa, instanceof doesn't work
            if (value?.constructor?.name === 'Uint8Array') {
                return `AZLE::Uint8Array::${[...value]
                    .map((uint8) => uint8.toString(16).padStart(2, '0'))
                    .join('')}`;
            }

            return value;
        });
    } else {
        return 'AZLE_STABLE_STORAGE_NOT_INITIALIZED';
    }
}

export function stable_storage_deserialize<T>(stable_storage: string): T {
    return JSON.parse(stable_storage, (_, value) => {
        if (typeof value === 'string') {
            if (value.startsWith('AZLE::BigInt::')) {
                return BigInt(value.replace('AZLE::BigInt::', ''));
            }

            if (value === 'AZLE::Undefined') {
                return undefined;
            }

            if (value.startsWith('AZLE::Principal::')) {
                return Principal.fromHex(
                    value.replace('AZLE::Principal::', '')
                );
            }

            if (value.startsWith('AZLE::Uint8Array::')) {
                return Uint8Array.from(
                    value
                        .replace('AZLE::Uint8Array::', '')
                        .match(/.{1,2}/g)
                        ?.map((x) => parseInt(x, 16)) ?? []
                );
            }
        }

        return value;
    });
}

export class StableBTreeMap<Key, Value> {
    /**
     * Creates a new StableBTreeMap object.
     * @param id A unique identifier for this StableBTreeMap instance.
     * @param maxKeySize the largest size a key will ever be.
     * @param maxValueSize the largest size a value will ever be.
     */
    constructor(id: string, maxKeySize: nat64, maxValueSize: nat64) {}

    get(key: Key): Value {
        return 'test_value' as Value;
    }
}
