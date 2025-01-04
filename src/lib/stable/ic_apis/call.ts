import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { v4 } from 'uuid';

import { idlDecode, idlEncode } from '../execute_with_candid_serde';

export async function call<Args extends any[] | undefined, Return = any>(
    canisterId: Principal | string,
    method: string,
    options?: {
        paramIdlTypes?: IDL.Type[];
        returnIdlType?: IDL.Type;
        args?: Args;
        cycles?: bigint;
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

        globalThis._azleResolveCallbacks[globalResolveId] = (
            result: Uint8Array | ArrayBuffer
        ): void => {
            if (raw !== undefined) {
                resolve(new Uint8Array(result) as Return);
            } else {
                const idlType =
                    returnTypeIdl === undefined ? [] : [returnTypeIdl];
                resolve(
                    idlDecode(idlType, new Uint8Array(result))[0] as Return
                );
            }
        };

        globalThis._azleRejectCallbacks[globalRejectId] = (
            error: any
        ): void => {
            reject(error);
        };

        const paramIdlTypes = options?.paramIdlTypes ?? [];
        const args = options?.args ?? [];
        const cycles = options?.cycles ?? 0n;

        const canisterIdPrincipal =
            typeof canisterId === 'string'
                ? Principal.fromText(canisterId)
                : canisterId;
        const canisterIdBytes = canisterIdPrincipal.toUint8Array();
        const argsRaw =
            raw === undefined ? idlEncode(paramIdlTypes, args) : raw;
        const cyclesString = cycles.toString();

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
