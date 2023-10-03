import '@dfinity/candid/lib/esm/idl'; // This must remain or the build fails
import { Principal } from '@dfinity/principal';
import { blob } from '../candid/types/constructed/blob';
import { Void } from '../candid/types/primitive/void';
import { AzleNat64, nat64 } from '../candid/types/primitive/nats/nat64';
import { nat } from '../candid/types/primitive/nats/nat';
import { nat32 } from '../candid/types/primitive/nats/nat32';
import { None, Opt, Some } from '../candid/types/constructed/option';
import { CandidType, toIDLType } from '../candid';
import { RejectionCode } from '../system_types/rejection_code';
import { v4 } from 'uuid';
import { EncodeVisitor } from '../candid/serde/visitors';
import { acceptMessage } from './accept_message';
import { stableRead } from './stable_read';
import { argDataRaw } from './arg_data_raw';
import { call } from './call';
import { call128 } from './call128';
import { callRaw } from './call_raw';
import { callRaw128 } from './call_raw_128';
import { caller } from './caller';
import { candidDecode } from './candid_decode';
import { candidEncode } from './candid_encode';
import { canisterBalance } from './canister_balance';
import { canisterBalance128 } from './cansiter_balance_128';
import { canisterVersion } from './canister_version';
import { clearTimer } from './clear_timer';
import { dataCertificate } from './data_certificate';
import { id } from './id';
import { instructionCounter } from './instruction_counter';
import { isController } from './is_controller';
import { msgCyclesAccept } from './msg_cycles_accept';
import { msgCyclesAccept128 } from './msg_cycles_accept_128';
import { msgCyclesAvailable } from './msg_cycles_available';
import { msgCyclesAvailable128 } from './msg_cycles_available_128';
import { msgCyclesRefunded } from './msg_cycles_refunded';
import { msgCyclesRefunded128 } from './msg_cycles_refunded_128';
import { setTimer } from './set_timer';
import { setTimerInterval } from './set_timer_interval';
import { rejectCode } from './reject_code';
import { reply } from './reply';
import { notify } from './notify';
import { notifyRaw } from './notify_raw';
import { performanceCounter } from './performance_counter';
import { replyRaw } from './reply_raw';
import { setCertifiedData } from './set_certified_data';
import { stableBytes } from './stable_bytes';
import { stableGrow } from './stable_grow';
import { stableSize } from './stable_size';
import { stableWrite } from './stable_write';
import { stable64Grow } from './stable_64_grow';
import { stable64Read } from './stable_64_read';
import { stable64Size } from './stable_64_size';
import { stable64Write } from './stable_64_write';
import { time } from './time';

// declare var globalThis: {
//     ic: Ic;
// };

declare var globalThis: any;

/**
 * Represents a duration of time in seconds.
 */
export type Duration = nat64; // TODO: Consider modeling this after the corresponding struct in Rust
export const Duration: AzleNat64 = AzleNat64 as any;

/**
 * Type returned by the {@link ic.setTimer} and {@link ic.setTimerInterval}
 * functions. Pass to {@link ic.clearTimer} to remove the timer.
 */
export type TimerId = nat64; // TODO: Consider modeling this after the corresponding struct in Rust
export const TimerId: AzleNat64 = AzleNat64 as any;

type Ic = {
    acceptMessage: typeof acceptMessage;
    /**
     * Accepts the ingress message. Calling from outside the
     * {@link $inspectMessage} context will cause the canister to trap.
     */
    // acceptMessage: () => void;

    /**
     * Returns the argument data as bytes.
     * @returns the argument data
     */
    argDataRaw: () => Uint8Array;

    /**
     * Gets the length of the raw-argument-data-bytes
     * @returns the data size
     */
    argDataRawSize: () => number;

    call<T extends (...args: any[]) => any>(
        method: T,
        config?: {
            args?: ArgsType<T>;
            cycles?: bigint;
        }
    ): ReturnTypeOf<T>;

    call128<T extends (...args: any[]) => any>(
        method: T,
        config?: {
            args?: ArgsType<T>;
            cycles?: bigint;
        }
    ): ReturnTypeOf<T>;

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
    ) => Promise<blob>; // TODO this should use a Result remember

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
    ) => Promise<blob>; // TODO this should use a Result remember

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
    candidDecode: (candidEncoded: Uint8Array) => string;

    /**
     * Converts a Candid string into bytes
     * @param candidString a valid Candid string
     * @returns the candid value as bytes
     */
    candidEncode: (candidString: string) => Uint8Array;

    /**
     * Gets the amount of funds available in the canister
     * @returns the number of cycles in the canister
     */
    canisterBalance: () => bigint;

    /**
     * Gets the amount of funds available in the canister
     * @returns the number of cycles in the canister
     */
    canisterBalance128: () => bigint;

    /**
     * Returns the canister version number
     *
     * @returns the version number
     */
    canisterVersion: () => bigint;

    /**
     * Cancels an existing timer. Does nothing if the timer has already been canceled.
     * @param id The ID of the timer to be cancelled.
     */
    clearTimer: (id: bigint) => void;

    /**
     * When called from a query call, returns the data certificate
     * authenticating `certifiedData` set by this canister. Otherwise returns
     * `None`.
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
    instructionCounter: () => bigint;

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
    msgCyclesAccept: (maxAmount: bigint) => bigint;

    /**
     * Moves cycles from the call to the canister balance
     * @param maxAmount the max amount of cycles to move
     * @returns the actual amount moved
     */
    msgCyclesAccept128: (maxAmount: bigint) => bigint;

    /**
     * Returns the amount of cycles that were transferred by the caller of the
     * current call, and is still available in this message
     * @returns the amount of cycles
     */
    msgCyclesAvailable: () => bigint;

    /**
     * Returns the amount of cycles that were transferred by the caller of the
     * current call, and is still available in this message
     * @returns the amount of cycles
     */
    msgCyclesAvailable128: () => bigint;

    /**
     * Returns the amount of cycles that came back with the response as a refund.
     * The refund has already been added to the canister balance automatically.
     * @returns the amount of cycles
     */
    msgCyclesRefunded: () => bigint;

    /**
     * Returns the amount of cycles that came back with the response as a refund.
     * The refund has already been added to the canister balance automatically.
     * @returns the amount of cycles
     */
    msgCyclesRefunded128: () => bigint;

    notify<T extends (...args: any[]) => any>(
        method: T,
        config?: {
            args?: ArgsType<T>;
            cycles?: bigint;
        }
    ): Void;

    notifyRaw: (
        canisterId: Principal,
        method: string,
        argsRaw: blob,
        payment: nat
    ) => Void;

    /**
     * Gets the value of the specified performance counter
     *
     * @param counterType the type of performance counter to use. Currently `0`
     * (instruction counter) is the only supported type. It returns the number
     * of WebAssembly instructions the system has determined that the canister
     * has executed.
     * @returns the performance counter metric
     */
    performanceCounter: (counterType: number) => bigint;

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
    rejectCode: () => typeof RejectionCode;

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
    reply: (reply: any, type: CandidType) => void;

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
    replyRaw: (buf: Uint8Array) => void;

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
    setCertifiedData: (data: Uint8Array) => void;

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
    stableBytes: () => Uint8Array;

    /**
     * Attempts to grow the stable memory by `newPages`.
     * @param newPages
     * @returns the previous size that was reserved.
     */
    stableGrow: (newPages: number) => number;

    /**
     * Reads data from the stable memory location specified by an offset
     * @param offset the location from which to read
     * @param length the length of buffer to read
     * @returns the raw bytes in stable memory
     */
    stableRead: typeof stableRead;

    /**
     * Gets current size of the stable memory (in WASM pages)
     * @returns the current memory size
     */
    stableSize: () => number;

    /**
     * Writes data to the stable memory location specified by an offset
     *
     * **Warning:** this will panic if `offset` + `buffer.length` exceeds the
     * current size of stable memory. Use {@link ic.stableGrow} to request more
     * stable memory if needed.
     * @param offset the location at which to write
     * @param buffer the data to write
     */
    stableWrite: (offset: number, buffer: Uint8Array) => void;

    /**
     * Attempts to grow the stable memory by `newPages`.
     * Supports 64-bit addressed memory.
     * @param newPages
     * @returns the previous size that was reserved.
     */
    stable64Grow: (newPages: bigint) => bigint;

    /**
     * Reads data from the stable memory location specified by an offset.
     * Supports 64-bit addressed memory.
     * @param offset the location from which to read
     * @param length the length of buffer to read
     * @returns the raw bytes in stable memory
     */
    stable64Read: (offset: bigint, length: bigint) => Uint8Array;

    /**
     * Gets current size of the stable memory (in WASM pages). Supports 64-bit
     * addressed memory.
     * @returns the current memory size
     */
    stable64Size: () => bigint;

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
    stable64Write: (offset: bigint, buffer: Uint8Array) => void;

    /**
     * Gets current timestamp, in nanoseconds since the epoch (1970-01-01)
     * @returns the current timestamp
     */
    time: () => bigint;

    /**
     * Stops execution and rejects the current request with a `CANISTER_ERROR`
     * (5) rejection code and the provided message
     * @param message the rejection message
     */
    trap: (message: string) => never;
};

type ArgsType<T> = T extends (...args: infer U) => any ? U : any;
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : any;
type ReturnTypeOfPromise<T> = T extends (...args: any[]) => infer R
    ? Promise<R>
    : never;

/** API entrypoint for interacting with the Internet Computer */
export const ic: Ic = globalThis._azleIc
    ? {
          ...globalThis._azleIc,
          stableRead,
          argDataRaw,
          call,
          call128,
          callRaw,
          callRaw128,
          caller,
          candidDecode,
          candidEncode,
          canisterBalance,
          canisterBalance128,
          canisterVersion,
          clearTimer,
          dataCertificate,
          id,
          instructionCounter,
          isController,
          msgCyclesAccept,
          msgCyclesAccept128,
          msgCyclesAvailable,
          msgCyclesAvailable128,
          msgCyclesRefunded,
          msgCyclesRefunded128,
          notify,
          notifyRaw,
          performanceCounter,
          rejectCode,
          reply,
          replyRaw,
          setCertifiedData,
          setTimer,
          setTimerInterval,
          stableBytes,
          stableGrow,
          stableSize,
          stableWrite,
          stable64Grow,
          stable64Read,
          stable64Size,
          stable64Write,
          time
      }
    : {
          acceptMessage: () => {},
          argDataRaw: () => {},
          argDataRawSize: () => {},
          callRaw: () => {},
          caller: () => {},
          candidDecode: () => {},
          candidEncode: () => {},
          canisterBalance: () => {},
          canisterBalance128: () => {},
          canisterVersion: () => {},
          clearTimer: () => {},
          id: () => {},
          instructionCounter: () => {},
          isController: () => {},
          methodName: () => {},
          msgCyclesAccept: () => {},
          msgCyclesAccept128: () => {},
          msgCyclesAvailable: () => {},
          msgCyclesAvailable128: () => {},
          msgCyclesRefunded: () => {},
          msgCyclesRefunded128: () => {},
          performanceCounter: () => {},
          print: () => {},
          reject: () => {},
          rejectCode: () => {},
          rejectMessage: () => {},
          reply: () => {},
          replyRaw: () => {},
          setCertifiedData: () => {},
          stableBytes: () => {},
          stableGrow: () => {},
          stableRead: () => {},
          stableSize: () => {},
          stableWrite: () => {},
          stable64Grow: () => {},
          stable64Read: () => {},
          stable64Size: () => {},
          stable64Write: () => {},
          time: () => {},
          trap: () => {}
      };
