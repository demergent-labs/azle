import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';

/**
 * Performs a cross-canister call without awaiting the result
 * @param canisterId
 * @param method
 * @param argsRaw
 * @param payment
 * @returns
 */
export function notify(
    canisterId: Principal | string,
    method: string,
    options?: {
        paramIdlTypes?: IDL.Type[];
        args?: any[];
        payment?: bigint;
        raw?: Uint8Array;
    }
): void {
    if (globalThis._azleIc === undefined) {
        return undefined;
    }

    const paramIdlTypes = options?.paramIdlTypes ?? [];
    const args = options?.args ?? [];
    const payment = options?.payment ?? 0n;
    const raw = options?.raw;

    const canisterIdPrincipal =
        typeof canisterId === 'string'
            ? Principal.fromText(canisterId)
            : canisterId;
    const canisterIdBytes = canisterIdPrincipal.toUint8Array().buffer;
    const argsRawBuffer =
        raw === undefined
            ? new Uint8Array(IDL.encode(paramIdlTypes, args)).buffer
            : raw.buffer;
    const paymentString = payment.toString();

    return globalThis._azleIc.notifyRaw(
        canisterIdBytes,
        method,
        argsRawBuffer,
        paymentString
    );
}
