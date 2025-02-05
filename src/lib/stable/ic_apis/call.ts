// TODO double-check undefined stuff on args and return encoding/decoding very well

import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { v4 } from 'uuid';

import { idlDecode, idlEncode } from '../execute_with_candid_serde';

type CallOptions<Args extends any[] | Uint8Array | undefined> = {
    paramIdlTypes?: IDL.Type[];
    returnIdlType?: IDL.Type;
    args?: Args;
    cycles?: bigint;
    oneway?: boolean;
    timeout?: bigint | null;
};

/**
 * Makes an inter-canister call to invoke a method on another canister.
 *
 * @param canisterId - The target canister's ID as a Principal or string
 * @param method - The name of the method to call on the target canister
 * @param options - Configuration options for the call
 * @param options.paramIdlTypes - Candid types for the parameters (optional)
 * @param options.returnIdlType - Candid type for the return value (optional)
 * @param options.args - Arguments to pass to the method (optional)
 * @param options.cycles - Number of cycles to attach to the call (optional). Represented as a u128 (max size 2^128 - 1)
 * @param options.raw - Raw bytes to send instead of encoded args (optional)
 * @returns Promise resolving to the method's return value
 *
 * @remarks
 * - Supports both high-level (with IDL types) and low-level (raw bytes) calls
 * - Can transfer cycles as part of the call
 * - Automatically encodes/decodes arguments and return values
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
    if (typeof options?.timeout === 'bigint') {
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
            options?.returnIdlType
        );
    }
}

function getCanisterIdBytes(canisterId: Principal | string): Uint8Array {
    return typeof canisterId === 'string'
        ? Principal.fromText(canisterId).toUint8Array()
        : canisterId.toUint8Array();
}

function getArgsRaw<Args extends any[] | Uint8Array | undefined>(
    callOptions?: CallOptions<Args>
): Uint8Array {
    if (callOptions?.paramIdlTypes === undefined) {
        if (callOptions?.args === undefined) {
            return idlEncode([], []);
        }

        if (callOptions.args instanceof Uint8Array === false) {
            throw new Error(
                `args must be a Uint8Array if no paramIdlTypes are provided to call`
            );
        }

        return callOptions.args;
    } else {
        if (Array.isArray(callOptions.args) === false) {
            throw new Error(
                `args must be an array of JavaScript values if paramIdlTypes are provided to call`
            );
        }

        return idlEncode(callOptions.paramIdlTypes, callOptions.args);
    }
}

function getCyclesString<Args extends any[] | Uint8Array | undefined>(
    options?: CallOptions<Args>
): string {
    const cycles = options?.cycles ?? 0n;
    return cycles.toString();
}

function handleOneWay<Return>(
    canisterIdBytes: Uint8Array,
    method: string,
    argsRaw: Uint8Array,
    cyclesString: string
): Promise<Return> {
    if (globalThis._azleIcExperimental !== undefined) {
        globalThis._azleIcExperimental.notifyRaw(
            canisterIdBytes.buffer,
            method,
            argsRaw.buffer,
            cyclesString
        );
    } else {
        globalThis._azleIcStable.notifyRaw(
            canisterIdBytes,
            method,
            argsRaw,
            cyclesString
        );
    }

    return Promise.resolve(undefined as Return);
}

function handleTwoWay<Return>(
    canisterIdBytes: Uint8Array,
    method: string,
    argsRaw: Uint8Array,
    cyclesString: string,
    returnIdlType?: IDL.Type
): Promise<Return> {
    return new Promise((resolve, reject) => {
        const promiseId = v4();

        createResolveCallback<Return>(promiseId, resolve, returnIdlType);
        createRejectCallback(promiseId, reject);

        if (globalThis._azleIcExperimental !== undefined) {
            globalThis._azleIcExperimental.callRaw(
                promiseId,
                canisterIdBytes.buffer,
                method,
                argsRaw.buffer,
                cyclesString
            );
        } else {
            globalThis._azleIcStable.callRaw(
                promiseId,
                canisterIdBytes,
                method,
                argsRaw,
                cyclesString
            );
        }
    });
}

// TODO right here we need to figure out how to handle a raw return value, vs a void Candid return value, versus a regular return value
function createResolveCallback<Return>(
    promiseId: string,
    resolve: (value: Return | PromiseLike<Return>) => void,
    returnIdlType?: IDL.Type
): void {
    const globalResolveId = `_resolve_${promiseId}`;

    globalThis._azleResolveCallbacks[globalResolveId] = (
        result: Uint8Array | ArrayBuffer
    ): void => {
        if (returnIdlType === undefined) {
            resolve(new Uint8Array(result) as Return);
        } else {
            // TODO this is wrong for a return value of void
            const idlType =
                Array.isArray(returnIdlType) && returnIdlType.length === 0
                    ? []
                    : [returnIdlType];

            resolve(idlDecode(idlType, new Uint8Array(result))[0] as Return);
        }
    };
}

function createRejectCallback(
    promiseId: string,
    reject: (reason?: any) => void
): void {
    const globalRejectId = `_reject_${promiseId}`;

    globalThis._azleRejectCallbacks[globalRejectId] = (
        error: unknown
    ): void => {
        reject(error);
    };
}
