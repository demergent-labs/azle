import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

import { idlEncode } from '../execute_with_candid_serde';

/**
 * Performs a cross-canister call without awaiting the result
 * @param canisterId The ID of the canister to notify
 * @param method The method to call on the canister
 * @param options Optional parameters for the call
 * @returns void
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
