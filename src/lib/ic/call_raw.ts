import { IDL } from '@dfinity/candid';
import { Principal } from '@dfinity/principal';
import { blob } from '../candid/types/constructed/blob';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { v4 } from 'uuid';

/**
 * Performs an asynchronous call to another canister using the [System API](
 * https://internetcomputer.org/docs/current/references/ic-interface-spec/#system-api-call)
 * and returns the payload without serialization
 * @param canisterId the principal of the canister to call
 * @param method the method to call
 * @param argsRaw the args to pass to the canister method
 * @param payment the number of cycles to send with the call
 * @returns
 */
export function callRaw(
    canisterId: Principal,
    method: string,
    argsRaw: blob,
    payment: nat64
): Promise<blob> {
    // TODO this should use a Result remember
    return new Promise((resolve, reject) => {
        const promiseId = v4();
        const globalResolveId = `_resolve_${promiseId}`;
        const globalRejectId = `_reject_${promiseId}`;

        // TODO perhaps we should be more robust
        // TODO for example, we can keep the time with these
        // TODO if they are over a certain amount old we can delete them
        globalThis[globalResolveId] = (bytes: ArrayBuffer) => {
            resolve(new Uint8Array(bytes));

            delete globalThis[globalResolveId];
            delete globalThis[globalRejectId];
        };

        globalThis[globalRejectId] = (error: any) => {
            reject(error);

            delete globalThis[globalResolveId];
            delete globalThis[globalRejectId];
        };

        const canisterIdBytes = canisterId.toUint8Array().buffer;
        const argsRawBuffer = argsRaw.buffer;
        const paymentCandidBytes = new Uint8Array(
            IDL.encode([IDL.Nat64], [payment])
        ).buffer;

        // TODO consider finally, what if deletion goes wrong
        try {
            globalThis._azleIc.callRaw(
                promiseId,
                canisterIdBytes,
                method,
                argsRawBuffer,
                paymentCandidBytes
            );
        } catch (error) {
            delete globalThis[globalResolveId];
            delete globalThis[globalRejectId];
            throw error;
        }
    });
}
