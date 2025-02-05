// TODO double-check undefined stuff on args and return encoding/decoding very well

import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { v4 } from 'uuid';

import { idlDecode, idlEncode } from '../execute_with_candid_serde';

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
    options?: {
        paramIdlTypes?: IDL.Type[];
        returnIdlType?: IDL.Type;
        args?: Args;
        cycles?: bigint;
        oneway?: boolean;
    }
): Promise<Return> {
    const paramIdlTypes = options?.paramIdlTypes ?? [];
    const args = options?.args;
    const cycles = options?.cycles ?? 0n;

    const canisterIdPrincipal =
        typeof canisterId === 'string'
            ? Principal.fromText(canisterId)
            : canisterId;
    const canisterIdBytes = canisterIdPrincipal.toUint8Array();
    // TODO don't do casts, do type guard type check things, we need to throw if these types are incorrect
    const argsRaw =
        options?.paramIdlTypes === undefined
            ? args === undefined
                ? idlEncode([], [])
                : (args as Uint8Array) // TODO work on undefined checks of course...should we do a Uint8Array.from or something? No, probably force a Uint8Array
            : idlEncode(paramIdlTypes, (args ?? []) as any[]);
    const cyclesString = cycles.toString();

    if (options?.oneway === true) {
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
    } else {
        return new Promise((resolve, reject) => {
            if (
                globalThis._azleIcStable === undefined &&
                globalThis._azleIcExperimental === undefined
            ) {
                return undefined;
            }

            const promiseId = v4();
            const globalResolveId = `_resolve_${promiseId}`;
            const globalRejectId = `_reject_${promiseId}`;

            const returnIdlType = options?.returnIdlType;

            globalThis._azleResolveCallbacks[globalResolveId] = (
                result: Uint8Array | ArrayBuffer
            ): void => {
                if (returnIdlType === undefined) {
                    resolve(new Uint8Array(result) as Return);
                } else {
                    // TODO this is wrong for a return value of void
                    const idlType =
                        Array.isArray(returnIdlType) &&
                        returnIdlType.length === 0
                            ? []
                            : [returnIdlType];

                    resolve(
                        idlDecode(idlType, new Uint8Array(result))[0] as Return
                    );
                }
            };

            globalThis._azleRejectCallbacks[globalRejectId] = (
                error: unknown
            ): void => {
                reject(error);
            };

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
}
