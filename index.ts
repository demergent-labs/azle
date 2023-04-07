import { Principal } from '@dfinity/principal';
import { RequireExactlyOne, Variant } from './variant';

export { StableBTreeMap, InsertError } from './src/stable_b_tree_map';
export { Variant } from './variant';
export { match } from './variant';

declare var globalThis: any;

export const ic: ic = globalThis.ic ?? {};

type ic = {
    acceptMessage: () => void;
    // argData: () => any[]; // TODO: See https://github.com/demergent-labs/azle/issues/496
    argDataRaw: () => blob;
    argDataRawSize: () => nat32;
    callRaw: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat64
    ) => Promise<FinalCallResult<blob>>;
    callRaw128: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat
    ) => Promise<FinalCallResult<blob>>;
    caller: () => Principal;
    candidDecode: (candidEncoded: blob) => string;
    candidEncode: (candidString: string) => blob;
    canisters: {
        [canisterName: string]: <T>(canisterId: Principal) => T;
    };
    canisterBalance: () => nat64;
    canisterBalance128: () => nat;
    /**
     * Cancels an existing timer. Does nothing if the timer has already been canceled.
     * @param id The ID of the timer to be cancelled.
     */
    clearTimer: (id: TimerId) => void;
    dataCertificate: () => Opt<blob>;
    id: () => Principal;
    methodName: () => string;
    msgCyclesAccept: (maxAmount: nat64) => nat64;
    msgCyclesAccept128: (maxAmount: nat) => nat;
    msgCyclesAvailable: () => nat64;
    msgCyclesAvailable128: () => nat;
    msgCyclesRefunded: () => nat64;
    msgCyclesRefunded128: () => nat;
    notifyRaw: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat
    ) => NotifyResult;
    performanceCounter: (counterType: nat32) => nat64;
    print: (...args: any) => void;
    reject: (message: string) => void;
    rejectCode: () => RejectionCode;
    rejectMessage: () => string;
    reply: (reply: any) => void;
    replyRaw: (buf: blob) => void;
    setCertifiedData: (data: blob) => void;
    /**
     * Sets callback to be executed later, after delay. Panics if `delay` + time() is more than 2^64 - 1.
     * To cancel the timer before it executes, pass the returned `TimerId` to `clearTimer`.
     * Note that timers are not persisted across canister upgrades.
     *
     * @param delay The time (in seconds) to wait before executing the provided callback.
     * @param callback the function to invoke after the specified delay has passed.
     * @returns the ID of the created timer. Used to cancel the timer.
     */
    setTimer: (
        delay: Duration,
        callback: () => void | Promise<void>
    ) => TimerId;
    /**
     * Sets callback to be executed every interval. Panics if `interval` + time() is more than 2^64 - 1.
     * To cancel the interval timer, pass the returned `TimerId` to `clearTimer`.
     * Note that timers are not persisted across canister upgrades.
     *
     * @param interval The interval (in seconds) between each callback execution.
     * @param callback the function to invoke after the specified delay has passed.
     * @returns the ID of the created timer. Used to cancel the timer.
     */
    setTimerInterval: (
        interval: Duration,
        callback: () => void | Promise<void>
    ) => TimerId;
    stableBytes: () => blob;
    stableGrow: (newPages: nat32) => StableGrowResult;
    stableRead: (offset: nat32, length: nat32) => blob;
    stableSize: () => nat32;
    stableWrite: (offset: nat32, buf: blob) => void;
    stable64Grow: (newPages: nat64) => Stable64GrowResult;
    stable64Read: (offset: nat64, length: nat64) => blob;
    stable64Size: () => nat64;
    stable64Write: (offset: nat64, buffer: blob) => void;
    time: () => nat64;
    trap: (message: string) => never;
};

/**
 * Used to mark an object as a Candid record.
 */
export type Record<T extends object> = T;
export type Opt<T> = T | null;

export type Alias<T> = T;

export type CallResult<T> = {
    call: () => Promise<FinalCallResult<T>>;
    notify: () => NotifyResult;
    cycles: (cycles: nat64) => CallResult<T>;
    cycles128: (cycles: nat) => CallResult<T>;
};

export type FinalCallResult<T> = RequireExactlyOne<{
    Ok: T;
    Err: string;
}>;

/** The return type of a guard function. Used to indicate whether the guarded function should halt or proceed. */
export type GuardResult = Alias<Result<null, string>>;

export type NotifyResult = Alias<Result<null, RejectionCode>>;

/**
 * Type returned by the `ic.setTimer` and `ic.setTimerInterval` functions. Pass to `ic.clearTimer` to remove the timer.
 */
export type TimerId = Alias<nat64>; // TODO: Consider modeling this after the corresponding struct in Rust

/**
 * Represents a duration of time in seconds.
 */
export type Duration = Alias<nat64>; // TODO: Consider modeling this after the corresponding struct in Rust

export type text = string;

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

export type Tuple<T extends unknown[]> = T;

// TODO type these more strictly
export type Query<T extends (...args: any[]) => any> = [Principal, string];
export type Update<T extends (...args: any[]) => any> = [Principal, string];
export type Oneway<T extends (...args: any[]) => any> = [Principal, string];

export type Func<T> = T;

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

export type StableGrowResult = Alias<Result<nat32, StableMemoryError>>;

export type Stable64GrowResult = Alias<Result<nat64, StableMemoryError>>;

/**
 * A decorator for marking query methods on services. Can only be
 * used on class properties with a return type of (args: any[]) =>
 * CallResult<T>.
 *
 * @example
 * ```ts
 * export class SomeOtherCanister extends Service {
 *   @query
 *   someCanisterMethod: (someParam: SomeParamType) => CallResult<SomeReturnType>;
 * }
 * ```
 */
export function serviceQuery(target: any, name: string) {
    serviceMethodDecoration(target, name);
}

/**
 * A decorator for marking update methods on services. Can only be
 * used on class properties with a return type of (args: any[]) =>
 * CallResult<T>.
 *
 * @example
 * ```ts
 * export class SomeOtherCanister extends Service {
 *   @update
 *   someCanisterMethod: (someParam: SomeParamType) => CallResult<SomeReturnType>;
 * }
 * ```
 */
export function serviceUpdate(target: any, name: string) {
    serviceMethodDecoration(target, name);
}

function serviceMethodDecoration(target: any, name: string) {
    Object.defineProperty(target, name, {
        get() {
            return (...args: any[]) => {
                return {
                    call: () => {
                        return (ic as any)[
                            `call_${target.constructor.name}_${name}`
                        ](this.canisterId, args);
                    },
                    notify: () => {
                        return (ic as any)[
                            `notify_${target.constructor.name}_${name}`
                        ](this.canisterId, args);
                    },
                    cycles: (cycles: nat64) => {
                        return {
                            call: () => {
                                return (ic as any)[
                                    `call_with_payment_${target.constructor.name}_${name}`
                                ](this.canisterId, [...args, cycles]);
                            },
                            notify: () => {
                                // There is no notifyWithPayment, there is only a notifyWithPayment128
                                return (ic as any)[
                                    `notify_with_payment128_${target.constructor.name}_${name}`
                                ](this.canisterId, args, cycles);
                            }
                        };
                    },
                    cycles128: (cycles: nat) => {
                        return {
                            notify: () => {
                                // There is no notifyWithPayment, there is only a notifyWithPayment128
                                return (ic as any)[
                                    `notify_with_payment128_${target.constructor.name}_${name}`
                                ](this.canisterId, args, cycles);
                            },
                            call: () => {
                                return (ic as any)[
                                    `call_with_payment128_${target.constructor.name}_${name}`
                                ](this.canisterId, [...args, cycles]);
                            }
                        };
                    }
                };
            };
        }
    });
}

/**
 * Parent class for creating Service definitions. To create an service
 * extend this class.
 * @example
 * ```ts
 * export class SomeOtherCanister extends Service {
 *   @query
 *   someCanisterMethod: (someParam: SomeParamType) => CallResult<SomeReturnType>;
 * }
 * ```
 *
 * You can then call a method on that canister like this:
 *
 * ```ts
 * const canister = new SomeOtherCanister(
 *   Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
 * );
 *
 * const result = await canister.someCanisterMethod().call();
 * ```
 */
export class Service {
    canisterId: Principal;

    constructor(canisterId: Principal) {
        this.canisterId = canisterId;
    }
}

export const $heartbeat = (options?: { guard?: () => GuardResult }) => {};
export const $init = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954
export const $inspectMessage = (options?: { guard?: () => GuardResult }) => {};
export const $postUpgrade = () => {}; // TODO: See https://github.com/demergent-labs/azle/issues/954
export const $preUpgrade = (options?: { guard?: () => GuardResult }) => {};
export const $query = (options?: { guard?: () => GuardResult }) => {};
export const $update = (options?: { guard?: () => GuardResult }) => {};

export type Manual<T> = void;

export type Result<Ok, Err> = Variant<{
    Ok: Ok;
    Err: Err;
}>;
