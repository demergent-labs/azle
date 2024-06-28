import { v4 } from 'uuid'; // TODO is uuid experimental?

import { IDL, Principal } from '../';

export async function call(
    canisterId: Principal | string,
    method: string,
    options?: {
        paramIdls?: IDL.Type[];
        returnIdl?: IDL.Type;
        args?: any[];
        payment?: bigint;
        raw?: Uint8Array;
    }
): Promise<any> {
    // TODO this should use a Result remember
    return new Promise((resolve, reject) => {
        if (globalThis._azleIc === undefined) {
            return undefined as any;
        }

        const promiseId = v4();
        const globalResolveId = `_resolve_${promiseId}`;
        const globalRejectId = `_reject_${promiseId}`;

        const returnIdl = options?.returnIdl;
        const raw = options?.raw;

        // TODO perhaps we should be more robust
        // TODO for example, we can keep the time with these
        // TODO if they are over a certain amount old we can delete them
        globalThis._azleResolveIds[globalResolveId] = (result: ArrayBuffer) => {
            if (raw !== undefined) {
                resolve(new Uint8Array(result));
            } else if (returnIdl === undefined) {
                resolve(undefined);
            } else {
                resolve(IDL.decode([returnIdl], result)[0]);
            }

            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
        };

        globalThis._azleRejectIds[globalRejectId] = (error: any) => {
            reject(error);

            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
        };

        const paramIdls = options?.paramIdls ?? [];
        const args = options?.args ?? [];
        const payment = options?.payment ?? 0n;

        const canisterIdPrincipal =
            typeof canisterId === 'string'
                ? Principal.fromText(canisterId)
                : canisterId;
        const canisterIdBytes = canisterIdPrincipal.toUint8Array().buffer;
        const argsRawBuffer =
            raw === undefined
                ? new Uint8Array(IDL.encode(paramIdls, args)).buffer
                : raw.buffer;
        const paymentString = payment.toString();

        // TODO consider finally, what if deletion goes wrong
        try {
            globalThis._azleIc.callRaw128(
                promiseId,
                canisterIdBytes,
                method,
                argsRawBuffer,
                paymentString
            );
        } catch (error) {
            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
            throw error;
        }
    });
}
