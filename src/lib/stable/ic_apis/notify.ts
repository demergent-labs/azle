import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

import { idlEncode } from '../execute_with_candid_serde';

/**
 * Performs a cross-canister call without waiting for a response.
 *
 * @param canisterId - The target canister's ID as a Principal or string
 * @param method - The method name to call on the target canister
 * @param options - Optional parameters:
 * @param options.paramIdlTypes - Array of IDL types for the parameters
 * @param options.args - Array of arguments to pass to the method
 * @param options.cycles - Amount of cycles to attach to the call (defaults to 0n)
 * @param options.raw - Raw bytes to pass as arguments instead of Candid-encoded args
 * @returns void, or no effect if called outside the IC environment
 *
 * @remarks
 * - The call is "fire and forget" - errors are not returned
 * - More efficient than await ic.call() when no response is needed
 * - **Call Context**:
 *   - update
 *   - composite query
 *   - after a cross-canister call
 *   - after a rejected cross-canister call
 *   - after a cross-canister call from a composite query
 *   - after a rejected cross-canister call from a composite query
 *   - heartbeat
 *   - timer
 *   - Note: Assuming same as call
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
