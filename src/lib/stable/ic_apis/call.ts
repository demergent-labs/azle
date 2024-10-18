import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { v4 } from 'uuid'; // TODO is uuid experimental?

export async function call<Args extends any[] | undefined, Return = any>(
    canisterId: Principal | string,
    method: string,
    options?: {
        paramIdlTypes?: IDL.Type[];
        returnIdlType?: IDL.Type;
        args?: Args;
        payment?: bigint; // TODO this should be called cycles: https://github.com/demergent-labs/azle/issues/2104
        raw?: Uint8Array;
    }
): Promise<Return> {
    // TODO this should use a Result remember
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

        const returnTypeIdl = options?.returnIdlType;
        const raw = options?.raw;

        // TODO perhaps we should be more robust
        // TODO for example, we can keep the time with these
        // TODO if they are over a certain amount old we can delete them
        globalThis._azleResolveIds[globalResolveId] = (
            result: Uint8Array
        ): void => {
            if (raw !== undefined) {
                resolve(result as Return);
            } else {
                const idlType =
                    returnTypeIdl === undefined ? [] : [returnTypeIdl];
                resolve(IDL.decode(idlType, result)[0] as Return);
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
        const canisterIdBytes = canisterIdPrincipal.toUint8Array();
        const argsRaw =
            raw === undefined
                ? new Uint8Array(IDL.encode(paramIdlTypes, args))
                : raw;
        const paymentString = payment.toString();

        // TODO consider finally, what if deletion goes wrong
        try {
            if (globalThis._azleIcExperimental !== undefined) {
                globalThis._azleIcExperimental.callRaw(
                    promiseId,
                    canisterIdBytes.buffer,
                    method,
                    argsRaw.buffer,
                    paymentString
                );
            } else {
                globalThis._azleIcStable.callRaw(
                    promiseId,
                    canisterIdBytes,
                    method,
                    argsRaw,
                    paymentString
                );
            }
        } catch (error) {
            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
            throw error;
        }
    });
}
