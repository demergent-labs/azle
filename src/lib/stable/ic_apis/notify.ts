import { IDL, Principal } from '../';

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
        paramIdls?: IDL.Type[];
        args?: any[];
        payment?: bigint;
    }
): void {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const paramIdls = options?.paramIdls ?? [];
    const args = options?.args ?? [];
    const payment = options?.payment ?? 0n;

    const canisterIdPrincipal =
        typeof canisterId === 'string'
            ? Principal.fromText(canisterId)
            : canisterId;
    const canisterIdBytes = canisterIdPrincipal.toUint8Array().buffer;
    const argsRawBuffer = new Uint8Array(IDL.encode(paramIdls, args)).buffer;
    const paymentString = payment.toString();

    return globalThis._azleIc.notifyRaw(
        canisterIdBytes,
        method,
        argsRawBuffer,
        paymentString
    );
}
