import '@dfinity/candid/lib/esm/idl'; // This must remain or the build fails
import { Principal } from '@dfinity/principal';
import { IDL } from './index';
import { blob, nat, nat32, nat64, AzleNat64, Void, Opt } from './primitives';
import { RejectionCode } from './system_types';
import { v4 } from 'uuid';
import { CandidClass, toIDLType } from './utils';

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
    /**
     * Accepts the ingress message. Calling from outside the
     * {@link $inspectMessage} context will cause the canister to trap.
     */
    acceptMessage: () => void;

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
    reply: (reply: any, type: CandidClass) => void;

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
    stableRead: (offset: number, length: number) => Uint8Array;

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

type ArgsType<T> = T extends (...args: infer U) => any ? U : never;
type ReturnTypeOf<T> = T extends (...args: any[]) => infer R ? R : never;
type ReturnTypeOfPromise<T> = T extends (...args: any[]) => infer R
    ? Promise<R>
    : never;

/** API entrypoint for interacting with the Internet Computer */
export const ic: Ic = globalThis._azleIc
    ? {
          ...globalThis._azleIc,
          argDataRaw: () => {
              return new Uint8Array(globalThis._azleIc.argDataRaw());
          },
          call: (method, config) => {
              // TODO probably get rid of .crossCanisterCallback
              return method.crossCanisterCallback(
                  '_AZLE_CROSS_CANISTER_CALL',
                  false,
                  ic.callRaw,
                  config?.cycles ?? 0n,
                  ...(config?.args ?? [])
              );
          },
          call128: (method, config) => {
              return method.crossCanisterCallback(
                  '_AZLE_CROSS_CANISTER_CALL',
                  false,
                  ic.callRaw128,
                  config?.cycles ?? 0n,
                  ...(config?.args ?? [])
              );
          },
          callRaw: (canisterId, method, argsRaw, payment) => {
              return new Promise((resolve, reject) => {
                  const promiseId = v4();
                  const globalResolveId = `_resolve_${promiseId}`;
                  const globalRejectId = `_reject_${promiseId}`;

                  // TODO perhaps we should be more robust
                  // TODO for example, we can keep the time with these
                  // TODO if they are over a certain amount old we can delete them
                  globalThis[globalResolveId] = (bytes: ArrayBuffer) => {
                      resolve(new Uint8Array(bytes));

                      delete globalThis[globalResolveId];
                      delete globalThis[globalRejectId];
                  };

                  globalThis[globalRejectId] = (error: any) => {
                      reject(error);

                      delete globalThis[globalResolveId];
                      delete globalThis[globalRejectId];
                  };

                  const canisterIdBytes = canisterId.toUint8Array().buffer;
                  const argsRawBuffer = argsRaw.buffer;
                  const paymentCandidBytes = new Uint8Array(
                      IDL.encode([IDL.Nat64], [payment])
                  ).buffer;

                  // TODO consider finally, what if deletion goes wrong
                  try {
                      globalThis._azleIc.callRaw(
                          promiseId,
                          canisterIdBytes,
                          method,
                          argsRawBuffer,
                          paymentCandidBytes
                      );
                  } catch (error) {
                      delete globalThis[globalResolveId];
                      delete globalThis[globalRejectId];
                      throw error;
                  }
              });
          },
          callRaw128: (canisterId, method, argsRaw, payment) => {
              return new Promise((resolve, reject) => {
                  const promiseId = v4();
                  const globalResolveId = `_resolve_${promiseId}`;
                  const globalRejectId = `_reject_${promiseId}`;

                  // TODO perhaps we should be more robust
                  // TODO for example, we can keep the time with these
                  // TODO if they are over a certain amount old we can delete them
                  globalThis[globalResolveId] = (bytes: ArrayBuffer) => {
                      resolve(new Uint8Array(bytes));

                      delete globalThis[globalResolveId];
                      delete globalThis[globalRejectId];
                  };

                  globalThis[globalRejectId] = (error: any) => {
                      reject(error);

                      delete globalThis[globalResolveId];
                      delete globalThis[globalRejectId];
                  };

                  const canisterIdBytes = canisterId.toUint8Array().buffer;
                  const argsRawBuffer = argsRaw.buffer;
                  const paymentCandidBytes = new Uint8Array(
                      IDL.encode([IDL.Nat], [payment])
                  ).buffer;

                  // TODO consider finally, what if deletion goes wrong
                  try {
                      globalThis._azleIc.callRaw128(
                          promiseId,
                          canisterIdBytes,
                          method,
                          argsRawBuffer,
                          paymentCandidBytes
                      );
                  } catch (error) {
                      delete globalThis[globalResolveId];
                      delete globalThis[globalRejectId];
                      throw error;
                  }
              });
          },
          caller: () => {
              const callerBytes = globalThis._azleIc.caller();
              return Principal.fromUint8Array(new Uint8Array(callerBytes));
          },
          candidDecode: (candidEncoded) => {
              return globalThis._azleIc.candidDecode(candidEncoded.buffer);
          },
          candidEncode: (candidString) => {
              return new Uint8Array(
                  globalThis._azleIc.candidEncode(candidString)
              );
          },
          canisterBalance: () => {
              const canisterBalanceCandidBytes =
                  globalThis._azleIc.canisterBalance();
              return IDL.decode([IDL.Nat64], canisterBalanceCandidBytes)[0];
          },
          canisterBalance128: () => {
              const canisterBalance128CandidBytes =
                  globalThis._azleIc.canisterBalance128();
              return IDL.decode([IDL.Nat], canisterBalance128CandidBytes)[0];
          },
          canisterVersion: () => {
              const canisterVersionCandidBytes =
                  globalThis._azleIc.canisterVersion();
              return IDL.decode([IDL.Nat64], canisterVersionCandidBytes)[0];
          },
          clearTimer: (timerId: nat64) => {
              const encode = (value: nat64) => {
                  return new Uint8Array(IDL.encode([IDL.Nat64], [value]))
                      .buffer;
              };

              globalThis._azleIc.clearTimer(encode(timerId));

              const timerCallbackId = globalThis.icTimers[timerId.toString()];

              delete globalThis.icTimers[timerId.toString()];
              delete globalThis[timerCallbackId];
          },
          dataCertificate: () => {
              const rawRustValue: ArrayBuffer | undefined =
                  globalThis._azleIc.dataCertificate();

              return rawRustValue === undefined
                  ? []
                  : [new Uint8Array(rawRustValue)];
          },
          id: () => {
              // TODO consider bytes instead of string, just like with caller
              const idString = globalThis._azleIc.id();
              return Principal.fromText(idString);
          },
          instructionCounter: () => {
              const instructionCounterCandidBytes =
                  globalThis._azleIc.instructionCounter();
              return IDL.decode([IDL.Nat64], instructionCounterCandidBytes)[0];
          },
          isController: (principal) => {
              return globalThis._azleIc.isController(
                  principal.toUint8Array().buffer
              );
          },
          msgCyclesAccept: (maxAmount: nat64) => {
              const maxAmountCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat64], [maxAmount])
              ).buffer;

              const msgCyclesAcceptCandidBytes =
                  globalThis._azleIc.msgCyclesAccept(maxAmountCandidBytes);

              return IDL.decode([IDL.Nat64], msgCyclesAcceptCandidBytes)[0];
          },
          msgCyclesAccept128: (maxAmount: nat64) => {
              const maxAmountCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat], [maxAmount])
              ).buffer;

              const msgCyclesAccept128CandidBytes =
                  globalThis._azleIc.msgCyclesAccept128(maxAmountCandidBytes);

              return IDL.decode([IDL.Nat], msgCyclesAccept128CandidBytes)[0];
          },
          msgCyclesAvailable: () => {
              const msgCyclesAvailableCandidBytes =
                  globalThis._azleIc.msgCyclesAvailable();

              return IDL.decode([IDL.Nat64], msgCyclesAvailableCandidBytes)[0];
          },
          msgCyclesAvailable128: () => {
              const msgCyclesAvailable128CandidBytes =
                  globalThis._azleIc.msgCyclesAvailable128();

              return IDL.decode([IDL.Nat], msgCyclesAvailable128CandidBytes)[0];
          },
          msgCyclesRefunded: () => {
              const msgCyclesRefundedCandidBytes =
                  globalThis._azleIc.msgCyclesRefunded();

              return IDL.decode([IDL.Nat64], msgCyclesRefundedCandidBytes)[0];
          },
          msgCyclesRefunded128: () => {
              const msgCyclesRefunded128CandidBytes =
                  globalThis._azleIc.msgCyclesRefunded128();

              return IDL.decode([IDL.Nat], msgCyclesRefunded128CandidBytes)[0];
          },
          notify: (method, config) => {
              return method.crossCanisterCallback(
                  '_AZLE_CROSS_CANISTER_CALL',
                  true,
                  ic.notifyRaw,
                  config?.cycles ?? 0n,
                  ...(config?.args ?? [])
              );
          },
          notifyRaw: (canisterId, method, argsRaw, payment) => {
              const canisterIdBytes = canisterId.toUint8Array().buffer;
              const argsRawBuffer = argsRaw.buffer;
              const paymentCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat], [payment])
              ).buffer;

              return globalThis._azleIc.notifyRaw(
                  canisterIdBytes,
                  method,
                  argsRawBuffer,
                  paymentCandidBytes
              );
          },
          performanceCounter: (counterType: nat32) => {
              const counterTypeCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat32], [counterType])
              ).buffer;

              const performanceCounterCandidBytes =
                  globalThis._azleIc.performanceCounter(counterTypeCandidBytes);

              return IDL.decode([IDL.Nat64], performanceCounterCandidBytes)[0];
          },
          rejectCode: () => {
              const rejectCodeNumber = globalThis._azleIc.rejectCode();

              switch (rejectCodeNumber) {
                  case 0:
                      return { NoError: null };
                  case 1:
                      return { SysFatal: null };
                  case 2:
                      return { SysTransient: null };
                  case 3:
                      return { DestinationInvalid: null };
                  case 4:
                      return { CanisterReject: null };
                  case 5:
                      return { CanisterError: null };
                  case 6:
                      return { Unknown: null };
                  default:
                      throw Error(
                          `Unknown rejection code: ${rejectCodeNumber}`
                      );
              }
          },
          reply: (reply: any, type: CandidClass): void => {
              if (Array.isArray(type) && type.length === 0) {
                  // return type is void
                  const bytes = new Uint8Array(IDL.encode([], [])).buffer;
                  return globalThis._azleIc.replyRaw(bytes);
              }
              const idlType = toIDLType(type, []);
              const bytes = new Uint8Array(IDL.encode([idlType], [reply]))
                  .buffer;
              return globalThis._azleIc.replyRaw(bytes);
          },
          replyRaw: (replyBuffer: blob) => {
              return globalThis._azleIc.replyRaw(replyBuffer.buffer);
          },
          setCertifiedData: (data) => {
              const dataBytes = new Uint8Array(
                  IDL.encode([IDL.Vec(IDL.Nat8)], [data])
              ).buffer;

              return globalThis._azleIc.setCertifiedData(dataBytes);
          },
          setTimer: (delay: nat64, callback: () => void | Promise<void>) => {
              const encode = (value: nat64) => {
                  return new Uint8Array(IDL.encode([IDL.Nat64], [value]))
                      .buffer;
              };

              const decode = (value: ArrayBufferLike) => {
                  return BigInt(IDL.decode([IDL.Nat64], value)[0] as number);
              };

              const timerCallbackId = `_timer_${v4()}`;

              const timerId = decode(
                  globalThis._azleIc.setTimer(encode(delay), timerCallbackId)
              );

              globalThis.icTimers[timerId.toString()] = timerCallbackId;

              globalThis[timerCallbackId] = () => {
                  try {
                      callback();
                  } finally {
                      delete globalThis.icTimers[timerId.toString()];
                      delete globalThis[timerCallbackId];
                  }
              };

              return timerId;
          },
          setTimerInterval: (
              interval: nat64,
              callback: () => void | Promise<void>
          ) => {
              const encode = (value: nat64) => {
                  return new Uint8Array(IDL.encode([IDL.Nat64], [value]))
                      .buffer;
              };

              const decode = (value: ArrayBufferLike) => {
                  return BigInt(IDL.decode([IDL.Nat64], value)[0] as number);
              };

              const timerCallbackId = `_interval_timer_${v4()}`;

              const timerId = decode(
                  globalThis._azleIc.setTimerInterval(
                      encode(interval),
                      timerCallbackId
                  )
              );

              globalThis.icTimers[timerId.toString()] = timerCallbackId;

              // We don't delete this even if the callback throws because
              // it still needs to be here for the next tick
              globalThis[timerCallbackId] = callback;

              return timerId;
          },
          stableBytes: () => {
              return new Uint8Array(globalThis._azleIc.stableBytes());
          },
          stableGrow: (newPages) => {
              const newPagesCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat32], [newPages])
              ).buffer;

              return IDL.decode(
                  [IDL.Nat32],
                  globalThis._azleIc.stableGrow(newPagesCandidBytes)
              )[0];
          },
          stableRead: (offset, buffer) => {
              const paramsCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat32, IDL.Nat32], [offset, buffer])
              ).buffer;

              return new Uint8Array(
                  globalThis._azleIc.stableRead(paramsCandidBytes)
              );
          },
          stableSize: () => {
              return IDL.decode(
                  [IDL.Nat32],
                  globalThis._azleIc.stableSize()
              )[0];
          },
          stableWrite: (offset, buffer) => {
              const paramsCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat32, IDL.Vec(IDL.Nat8)], [offset, buffer])
              ).buffer;

              return globalThis._azleIc.stableWrite(paramsCandidBytes);
          },
          stable64Grow: (newPages) => {
              const newPagesCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat64], [newPages])
              ).buffer;

              return IDL.decode(
                  [IDL.Nat64],
                  globalThis._azleIc.stable64Grow(newPagesCandidBytes)
              )[0];
          },
          stable64Read: (offset, buffer) => {
              const paramsCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat64, IDL.Nat64], [offset, buffer])
              ).buffer;

              return new Uint8Array(
                  globalThis._azleIc.stable64Read(paramsCandidBytes)
              );
          },
          stable64Size: () => {
              return IDL.decode(
                  [IDL.Nat64],
                  globalThis._azleIc.stable64Size()
              )[0];
          },
          stable64Write: (offset, buffer) => {
              const paramsCandidBytes = new Uint8Array(
                  IDL.encode([IDL.Nat64, IDL.Vec(IDL.Nat8)], [offset, buffer])
              ).buffer;

              return globalThis._azleIc.stable64Write(paramsCandidBytes);
          },
          time: () => {
              const timeCandidBytes = globalThis._azleIc.time();
              return IDL.decode([IDL.Nat64], timeCandidBytes)[0];
          }
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
          stableRead: () => {},
          stableSize: () => {},
          stableWrite: () => {},
          stable64Read: () => {},
          stable64Size: () => {},
          stable64Write: () => {},
          time: () => {},
          trap: () => {}
      };
