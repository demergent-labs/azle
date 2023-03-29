import {
    Alias,
    blob,
    nat32,
    nat64,
    nat,
    Opt,
    Principal,
    Variant
} from './candid_types';
import { FinalCallResult, Result } from './results';

declare var globalThis: any;

/**
 * Represents a duration of time in seconds.
 */
export type Duration = Alias<nat64>; // TODO: Consider modeling this after the corresponding struct in Rust

export type NotifyResult = Alias<Result<null, RejectionCode>>;

export type RejectionCode = Variant<{
    NoError: null;
    SysFatal: null;
    SysTransient: null;
    DestinationInvalid: null;
    CanisterReject: null;
    CanisterError: null;
    Unknown: null;
}>;

export type Stable64GrowResult = Alias<Result<nat64, StableMemoryError>>;

export type StableGrowResult = Alias<Result<nat32, StableMemoryError>>;

export type StableMemoryError = Variant<{
    OutOfMemory: null;
    OutOfBounds: null;
}>;

/**
 * Type returned by the `ic.setTimer` and `ic.setTimerInterval` functions. Pass to `ic.clearTimer` to remove the timer.
 */
export type TimerId = Alias<nat64>; // TODO: Consider modeling this after the corresponding struct in Rust

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

export const ic: ic = globalThis.ic ?? {};
