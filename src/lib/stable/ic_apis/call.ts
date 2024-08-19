import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { v4 } from 'uuid'; // TODO is uuid experimental?

export async function call(
    canisterId: Principal | string,
    method: string,
    options?: {
        paramIdlTypes?: IDL.Type[];
        returnIdlType?: IDL.Type;
        args?: any[];
        payment?: bigint;
        raw?: Uint8Array;
    }
): Promise<any> {
    // TODO this should use a Result remember
    return new Promise((resolve, reject) => {
        if (globalThis._azleIc === undefined) {
            return undefined;
        }

        const promiseId = v4();
        const globalResolveId = `_resolve_${promiseId}`;
        const globalRejectId = `_reject_${promiseId}`;

        const returnTypeIdl = options?.returnIdlType;
        const raw = options?.raw;

        // TODO perhaps we should be more robust
        // TODO for example, we can keep the time with these
        // TODO if they are over a certain amount old we can delete them
        globalThis._azleResolveIds[globalResolveId] = (
            result: ArrayBuffer
        ): void => {
            if (raw !== undefined) {
                resolve(new Uint8Array(result));
            } else {
                const idlType =
                    returnTypeIdl === undefined ? [] : [returnTypeIdl];
                resolve(IDL.decode(idlType, result)[0]);
            }

            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
        };

        globalThis._azleRejectIds[globalRejectId] = (error: any): void => {
            reject(error);

            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
        };

        const paramIdlTypes = options?.paramIdlTypes ?? [];
        const args = options?.args ?? [];
        const payment = options?.payment ?? 0n;

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

        // TODO consider finally, what if deletion goes wrong
        try {
            globalThis._azleIc.callRaw(
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
