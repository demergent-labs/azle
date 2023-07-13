// Some JS docs licensed under https://github.com/dfinity/cdk-rs/blob/main/LICENSE
// Some documentation changed from original work.

import { Manual } from './';
import {
    $init,
    $inspectMessage,
    $query,
    $preUpgrade,
    $postUpgrade,
    $update
} from './annotations';
import {
    blob,
    nat32,
    nat64,
    nat,
    Opt,
    Principal,
    Variant
} from './candid_types';
import { Result } from './results';

declare var globalThis: any;

/**
 * Represents a duration of time in seconds.
 */
export type Duration = nat64; // TODO: Consider modeling this after the corresponding struct in Rust

export type NotifyResult = Result<null, RejectionCode>;

/**
 * Indicates an error was encountered during a canister method.
 */
export type RejectionCode = Variant<{
    NoError: null;
    SysFatal: null;
    SysTransient: null;
    DestinationInvalid: null;
    CanisterReject: null;
    CanisterError: null;
    Unknown: null;
}>;

export type Stable64GrowResult = Result<nat64, StableMemoryError>;

export type StableGrowResult = Result<nat32, StableMemoryError>;

/** Indicates an error occurred when dealing with stable memory */
export type StableMemoryError = Variant<{
    /** No more stable memory could be allocated */
    OutOfMemory: null;
    /** Attempted to read more stable memory than had been allocated */
    OutOfBounds: null;
}>;

/**
 * Type returned by the {@link ic.setTimer} and {@link ic.setTimerInterval}
 * functions. Pass to {@link ic.clearTimer} to remove the timer.
 */
export type TimerId = nat64; // TODO: Consider modeling this after the corresponding struct in Rust

type ic = {
    /**
     * Accepts the ingress message. Calling from outside the
     * {@link $inspectMessage} context will cause the canister to trap.
     */
    acceptMessage: () => void;

    // argData: () => any[]; // TODO: See https://github.com/demergent-labs/azle/issues/496

    /**
     * Returns the argument data as bytes.
     * @returns the argument data
     */
    argDataRaw: () => blob;

    /**
     * Gets the length of the raw-argument-data-bytes
     * @returns the data size
     */
    argDataRawSize: () => nat32;

    /**
     * Performs an asynchronous call to another canister using the [System API](
     * https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-call)
     * and returns the payload without serialization
     * @param canisterId the principal of the canister to call
     * @param method the method to call
     * @param argsRaw the args to pass to the canister method
     * @param payment the number of cycles to send with the call
     * @returns
     */
    callRaw: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat64
    ) => Promise<Result<blob, string>>;

    /**
     * Performs an asynchronous call to another canister using the [System API](
     * https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-call)
     * and returns the payload without serialization
     * @param canisterId the principal of the canister to call
     * @param method the method to call
     * @param argsRaw the args to pass to the canister method
     * @param payment the number of cycles to send with the call
     * @returns
     */
    callRaw128: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat
    ) => Promise<Result<blob, string>>;

    /**
     * Returns the caller of the current call
     * @returns the caller of the current call
     */
    caller: () => Principal;

    /**
     * Converts a candid value into a Candid string
     * @param candidEncoded a raw Candid value
     * @returns the Candid string
     */
    candidDecode: (candidEncoded: blob) => string;

    /**
     * Converts a Candid string into bytes
     * @param candidString a valid Candid string
     * @returns the candid value as bytes
     */
    candidEncode: (candidString: string) => blob;

    canisters: {
        [canisterName: string]: <T>(canisterId: Principal) => T;
    };
    /**
     * Gets the amount of funds available in the canister
     * @returns the number of cycles in the canister
     */
    canisterBalance: () => nat64;

    /**
     * Gets the amount of funds available in the canister
     * @returns the number of cycles in the canister
     */
    canisterBalance128: () => nat;

    /**
     * Returns the canister version number
     *
     * @returns the version number
     */
    canisterVersion: () => nat64;
    /**
     * Cancels an existing timer. Does nothing if the timer has already been canceled.
     * @param id The ID of the timer to be cancelled.
     */
    clearTimer: (id: TimerId) => void;

    /**
     * When called from a query call, returns the data certificate
     * authenticating `certifiedData` set by this canister. Returns `None` if
     * called from a query call.
     * @returns the data certificate or None
     */
    dataCertificate: () => Opt<blob>;

    /**
     * Gets the id of this canister
     * @returns the canister id
     */
    id: () => Principal;

    /**
     * Returns the number of instructions that the canister executed since the
     * last [entry point](
     *   https://internetcomputer.org/docs/current/references/ic-interface-spec/#entry-points
     * )
     *
     * @returns the number of instructions
     */
    instructionCounter: () => nat64;

    /** Determine if a {@link Principal} is a controller of the canister. */
    isController: (principal: Principal) => boolean;

    /**
     * Returns the name of the current canister methods
     * @returns the current canister method
     */
    methodName: () => string;

    /**
     * Moves cycles from the call to the canister balance
     * @param maxAmount the max amount of cycles to move
     * @returns the actual amount moved
     */
    msgCyclesAccept: (maxAmount: nat64) => nat64;

    /**
     * Moves cycles from the call to the canister balance
     * @param maxAmount the max amount of cycles to move
     * @returns the actual amount moved
     */
    msgCyclesAccept128: (maxAmount: nat) => nat;

    /**
     * Returns the amount of cycles that were transferred by the caller of the
     * current call, and is still available in this message
     * @returns the amount of cycles
     */
    msgCyclesAvailable: () => nat64;

    /**
     * Returns the amount of cycles that were transferred by the caller of the
     * current call, and is still available in this message
     * @returns the amount of cycles
     */
    msgCyclesAvailable128: () => nat;

    /**
     * Returns the amount of cycles that came back with the response as a refund.
     * The refund has already been added to the canister balance automatically.
     * @returns the amount of cycles
     */
    msgCyclesRefunded: () => nat64;

    /**
     * Returns the amount of cycles that came back with the response as a refund.
     * The refund has already been added to the canister balance automatically.
     * @returns the amount of cycles
     */
    msgCyclesRefunded128: () => nat;
    notifyRaw: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat
    ) => NotifyResult;

    /**
     * Gets the value of the specified performance counter
     *
     * @param counterType the type of performance counter to use. Currently `0`
     * (instruction counter) is the only supported type. It returns the number
     * of WebAssembly instructions the system has determined that the canister
     * has executed.
     * @returns the performance counter metric
     */
    performanceCounter: (counterType: nat32) => nat64;

    /**
     * Prints the given message
     * @param args the message to print
     */
    print: (...args: any) => void;

    /**
     * Rejects the current call with the provided message
     * @param message the rejection message
     */
    reject: (message: string) => void;

    /**
     * Returns the rejection code from the most recently executed cross-canister
     * call
     * @returns the rejection code
     */
    rejectCode: () => RejectionCode;

    /**
     * Returns the rejection message from the most recently executed
     * cross-canister call
     *
     * **Warning**: Traps if there is no reject message. It is recommended to
     * check {@link ic.rejectCode} first.
     *
     * @returns the rejection message
     */
    rejectMessage: () => string;

    /**
     * Used to manually reply to an ingress message. Intended to be used in
     * canister methods with a {@link Manual} return type.
     * @param reply the value with which to reply. Must by of type `T` where `T`
     * is the generic type supplied to `Manual<T>`. Otherwise will result in an
     * uncaught `TypeError`.
     */
    reply: (reply: any) => void;

    /**
     * Used to manually reply to an ingress message. Intended to be used in
     * canister methods with a {@link Manual} return type.
     * @param buf the value with which to reply. Intended to be used in conjunction with
     * {@link ic.candidEncode}.
     * @example
     * ```ts
     * $update;
     * export function replyRaw(): Manual<RawReply> {
     *     ic.replyRaw(
     *         ic.candidEncode(
     *             '(record { "int" = 42; "text" = "text"; "bool" = true; "blob" = blob "raw bytes"; "variant" = variant { Medium } })'
     *         )
     *     );
     * }
     * ```
     */
    replyRaw: (buf: blob) => void;

    /**
     * Sets the certified data of this canister.
     *
     * Canisters can store up to 32 bytes of data that is certified by the
     * system on a regular basis. One can call {@link ic.dataCertificate} from a
     * {@link $query} call to get a certificate authenticating the value set by
     * calling this function.

     * This function can only be called from the following contexts:
     *
     * - {@link $init}, {@link $preUpgrade} and {@link $postUpgrade} hooks
     * - {@link $update} calls
     * - reply or reject callbacks
     *
     * This function traps if:
     *
     * - `data.length` > 32
     * - called from an illegal context (e.g. from a {@link $query} call)
     *
     * @param data the data to be set
     * @returns
     */
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

    /**
     * Gets a copy of stable memory
     *
     * **Note:** This will map the whole memory, even if not all of it has
     * been written to.
     * @returns a copy of the stable memory
     */
    stableBytes: () => blob;

    /**
     * Attempts to grow the stable memory by `newPages` (added pages)
     *
     * **Note:** Pages are 64KiB in WASM
     *
     * @param newPages the number of pages to add
     * @returns an error if it wasn't able to grow. Otherwise, returns the
     * previous size that was reserved.
     */
    stableGrow: (newPages: nat32) => StableGrowResult;

    /**
     * Reads data from the stable memory location specified by an offset
     * @param offset the location from which to read
     * @param length the length of buffer to read
     * @returns the raw bytes in stable memory
     */
    stableRead: (offset: nat32, length: nat32) => blob;

    /**
     * Gets current size of the stable memory (in WASM pages)
     * @returns the current memory size
     */
    stableSize: () => nat32;

    /**
     * Writes data to the stable memory location specified by an offset
     *
     * **Warning:** this will panic if `offset` + `buffer.length` exceeds the
     * current size of stable memory. Use {@link ic.stableGrow} to request more
     * stable memory if needed.
     * @param offset the location at which to write
     * @param buffer the data to write
     */
    stableWrite: (offset: nat32, buffer: blob) => void;

    /**
     * Attempts to grow the stable memory by `newPages` (added pages). Supports
     * 64-bit addressed memory.
     *
     * **Note:** Pages are 64KiB in WASM
     *
     * @param newPages the number of pages to add
     * @returns an error if it wasn't able to grow. Otherwise, returns the
     * previous size that was reserved.
     */
    stable64Grow: (newPages: nat64) => Stable64GrowResult;

    /**
     * Reads data from the stable memory location specified by an offset.
     * Supports 64-bit addressed memory.
     * @param offset the location from which to read
     * @param length the length of buffer to read
     * @returns the raw bytes in stable memory
     */
    stable64Read: (offset: nat64, length: nat64) => blob;

    /**
     * Gets current size of the stable memory (in WASM pages). Supports 64-bit
     * addressed memory.
     * @returns the current memory size
     */
    stable64Size: () => nat64;

    /**
     * Writes data to the stable memory location specified by an offset.
     * Supports 64-bit addressed memory.
     *
     * **Warning:** this will panic if `offset` + `buffer.length` exceeds the
     * current size of stable memory. Use {@link ic.stable64Grow} to request
     * more stable memory if needed.
     * @param offset the location at which to write
     * @param buffer the data to write
     */
    stable64Write: (offset: nat64, buffer: blob) => void;

    /**
     * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
     * @returns the current timestamp
     */
    time: () => nat64;

    /**
     * Stops execution and rejects the current request with a `CANISTER_ERROR`
     * (5) rejection code and the provided message
     * @param message the rejection message
     */
    trap: (message: string) => never;
};

/** API entrypoint for interacting with the Internet Computer */
export const ic: ic = globalThis.ic ?? {};
