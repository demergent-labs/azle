import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

import { idlEncode } from '../execute_with_candid_serde';

/**
 * Performs a cross-canister call without waiting for a response.
 *
 * @param canisterId - The target canister's ID as a Principal or string
 * @param method - The method name to call on the target canister
 * @param options - Optional parameters:
 *   - paramIdlTypes: Array of IDL types for the parameters
 *   - args: Array of arguments to pass to the method
 *   - cycles: Amount of cycles to attach to the call (defaults to 0n)
 *   - raw: Raw bytes to pass as arguments instead of Candid-encoded args
 * @returns void, or no effect if called outside the IC environment
 *
 * @example
 * // Basic notify call
 * notify(otherCanister, "updateCounter");
 *
 * // Notify with arguments and cycles
 * notify(otherCanister, "deposit", {
 *   paramIdlTypes: [IDL.Nat64],
 *   args: [1000n],
 *   cycles: 10_000_000n
 * });
 *
 * @remarks
 * - The call is "fire and forget" - errors are not returned
 * - Useful for non-critical updates where response/error handling isn't needed
 * - More efficient than await ic.call() when you don't need the response
 */
export function notify(
    canisterId: Principal | string,
    method: string,
    options?: {
        paramIdlTypes?: IDL.Type[];
        args?: any[];
        cycles?: bigint;
        raw?: Uint8Array;
    }
): void {
    if (
        globalThis._azleIcStable === undefined &&
        globalThis._azleIcExperimental === undefined
    ) {
        return undefined;
    }

    const paramIdlTypes = options?.paramIdlTypes ?? [];
    const args = options?.args ?? [];
    const cycles = options?.cycles ?? 0n;
    const raw = options?.raw;

    const canisterIdPrincipal =
        typeof canisterId === 'string'
            ? Principal.fromText(canisterId)
            : canisterId;
    const canisterIdBytes = canisterIdPrincipal.toUint8Array();
    const argsRaw = raw === undefined ? idlEncode(paramIdlTypes, args) : raw;
    const cyclesString = cycles.toString();

    if (globalThis._azleIcExperimental !== undefined) {
        return globalThis._azleIcExperimental.notifyRaw(
            canisterIdBytes.buffer,
            method,
            argsRaw.buffer,
            cyclesString
        );
    }

    return globalThis._azleIcStable.notifyRaw(
        canisterIdBytes,
        method,
        argsRaw,
        cyclesString
    );
}
