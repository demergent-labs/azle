import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

import { idlDecode, idlEncode } from '../execute_with_candid_serde';
import { RejectCode } from './msg_reject_code';

export type CallOptions<Args extends any[] | Uint8Array | undefined> = {
    /**
     * Candid types for encoding the arguments
     */
    paramIdlTypes?: IDL.Type[];
    /**
     * Candid type for decoding the return value
     */
    returnIdlType?: IDL.Type;
    /**
     * Arguments to pass to the method. An array of JavaScript values for non-raw calls, a Uint8Array for raw calls
     */
    args?: Args;
    /**
     * Number of cycles to attach to the call. Represented as a u128 (max size 2^128 - 1)
     */
    cycles?: bigint;
    /**
     * Instructs the inter-canister call to resolve its promise immediately without waiting for the response. ICP's async mechanism is not invoked
     */
    oneway?: boolean;
    /**
     * Instructs the inter-canister call to accept raw bytes for the arguments and to return raw bytes; skips encoding and decoding
     */
    raw?: boolean;
    /**
     * Not yet implemented. Will allow for best-effort inter-canister calls
     */
    timeout?: number | null;
};

/**
 * The error object thrown on an unsuccessful inter-canister call.
 *
 * @property rejectCode - Code associated with an unsuccessful inter-canister call
 * @property rejectMessage - An optional message providing additional context or details about the reject
 */
// TODO add the sync property once the ic-cdk v0.18.0 comes out
export interface CallError extends Error {
    rejectCode: RejectCode;
    rejectMessage?: string;
}

/**
 * Makes an inter-canister call to a method on another canister.
 *
 * @param canisterId - The target canister's ID
 * @param method - The name of the method to call on the target canister
 * @param options - Configuration options for the call
 * @param options.paramIdlTypes - Candid types for encoding the arguments
 * @param options.returnIdlType - Candid type for decoding the return value
 * @param options.args - Arguments to pass to the method. An array of JavaScript values for non-raw calls, a Uint8Array for raw calls
 * @param options.cycles - Number of cycles to attach to the call. Represented as a u128 (max size 2^128 - 1)
 * @param options.oneway - Instructs the inter-canister call to resolve its promise immediately without waiting for the response. ICP's async mechanism is not invoked
 * @param options.raw - Instructs the inter-canister call to accept raw bytes for the arguments and to return raw bytes; skips encoding and decoding
 * @param options.timeout - Not yet implemented. Will allow for best-effort inter-canister calls
 *
 * @returns Promise resolving to the target canister method's return value
 *
 * @remarks
 *
 * - By default (if oneway is not set to true) the inter-canister call is asynchronous according to ICP's async mechanism
 * - Supports both high-level (with IDL types) and low-level (raw bytes) calls
 * - Calls are routed based on the target canister's ID, regardless of which subnet the originating and target canisters are deployed to
 *
 * - **Call Context**:
 *   - \@update
 *   - \@query(..., { composite: true })
 *   - \@heartbeat
 *   - timer
 *   - after a successful inter-canister await
 *   - after an unsuccessful inter-canister await
 *   - after a successful inter-canister await from a composite query
 *   - after an unsuccessful inter-canister await from a composite query
 */
export async function call<
    Args extends any[] | Uint8Array | undefined,
    Return = any
>(
    canisterId: Principal | string,
    method: string,
    options?: CallOptions<Args>
): Promise<Return> {
    if (globalThis._azleExperimental === true) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { call: callExperimental } = require('#experimental/lib/ic/call');

        return await callExperimental(canisterId, method, options);
    }

    if (globalThis._azleIcStable === undefined) {
        return undefined as Return;
    }

    if (typeof options?.timeout === 'number') {
        throw new Error('timeout is not yet implemented');
    }

    const canisterIdBytes = getCanisterIdBytes(canisterId);
    const argsRaw = getArgsRaw(options);
    const cyclesString = getCyclesString(options);

    if (options?.oneway === true) {
        return handleOneWay<Return>(
            canisterIdBytes,
            method,
            argsRaw,
            cyclesString
        );
    } else {
        return handleTwoWay<Return>(
            canisterIdBytes,
            method,
            argsRaw,
            cyclesString,
            options?.raw ?? false,
            options?.returnIdlType
        );
    }
}

export function getCanisterIdBytes(canisterId: Principal | string): Uint8Array {
    return typeof canisterId === 'string'
        ? Principal.fromText(canisterId).toUint8Array()
        : canisterId.toUint8Array();
}

export function getArgsRaw<Args extends any[] | Uint8Array | undefined>(
    callOptions?: CallOptions<Args>
): Uint8Array {
    if (callOptions?.raw === true) {
        if (callOptions?.args === undefined) {
            return new Uint8Array([68, 73, 68, 76, 0, 0]); // pre-encoded Candid empty params
        }

        if (callOptions.args instanceof Uint8Array === false) {
            throw new Error(
                `args must be a Uint8Array. If you did not intend to make a raw call, then consider setting the raw property of the call options to undefined or false`
            );
        }

        return callOptions.args;
    } else {
        if (callOptions?.args instanceof Uint8Array === true) {
            throw new Error(
                `args must be an array of JavaScript values. If you intended to make a raw call, then consider setting the raw property of the call options to true`
            );
        }

        if (
            callOptions?.paramIdlTypes === undefined &&
            callOptions?.args === undefined
        ) {
            return new Uint8Array([68, 73, 68, 76, 0, 0]); // pre-encoded Candid empty params
        }

        return idlEncode(
            callOptions?.paramIdlTypes ?? [],
            callOptions?.args ?? []
        );
    }
}

export function getCyclesString<Args extends any[] | Uint8Array | undefined>(
    options?: CallOptions<Args>
): string {
    const cycles = options?.cycles ?? 0n;
    return cycles.toString();
}

// TODO should I resolve the Promise in Rust in notifyRaw?
function handleOneWay<Return>(
    canisterIdBytes: Uint8Array,
    method: string,
    argsRaw: Uint8Array,
    cyclesString: string
): Promise<Return> {
    if (globalThis._azleIcStable === undefined) {
        throw new Error('globalThis._azleIcStable is not defined');
    }

    if (globalThis._azleIcStable !== undefined) {
        globalThis._azleIcStable.notifyRaw(
            canisterIdBytes,
            method,
            argsRaw,
            cyclesString
        );
    }

    return Promise.resolve(undefined as Return);
}

// TODO should Return be different somehow?
async function handleTwoWay<Return>(
    canisterIdBytes: Uint8Array,
    method: string,
    argsRaw: Uint8Array,
    cyclesString: string,
    raw: boolean,
    returnIdlType?: IDL.Type
): Promise<Return> {
    if (globalThis._azleIcStable !== undefined) {
        const result = await globalThis._azleIcStable.callRaw(
            canisterIdBytes,
            method,
            argsRaw,
            cyclesString
        );

        if (raw === true) {
            return result as Return;
        } else {
            return idlDecode(
                returnIdlType === undefined ? [] : [returnIdlType],
                result
            )[0] as Return;
        }
    }

    throw new Error('globalThis._azleIcStable is not defined');
}
