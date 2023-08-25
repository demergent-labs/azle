import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

// declare var globalThis: {
//     ic: Ic;
// };

declare var globalThis: any;

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
     * Gets a copy of stable memory
     *
     * **Note:** This will map the whole memory, even if not all of it has
     * been written to.
     * @returns a copy of the stable memory
     */
    stableBytes: () => Uint8Array;

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

/** API entrypoint for interacting with the Internet Computer */
export const ic: Ic = globalThis._azleIc
    ? {
          ...globalThis._azleIc,
          caller: () => {
              const callerBytes = globalThis._azleIc.caller();
              return Principal.fromUint8Array(callerBytes);
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
              return globalThis._azleIc.isController(principal.toUint8Array());
          }
      }
    : {
          acceptMessage: () => {},
          argDataRaw: () => {},
          argDataRawSize: () => {},
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
          rejectMessage: () => {},
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
