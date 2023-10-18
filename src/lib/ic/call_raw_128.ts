import { Principal } from '@dfinity/principal';
import { blob } from '../candid/types/constructed/blob';
import { nat } from '../candid/types/primitive/nats/nat';
import { v4 } from 'uuid';
import { text } from '../candid/types/primitive/text';
import { encode } from '../candid/serde/encode';

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
export function callRaw128(
    canisterId: Principal,
    method: text,
    argsRaw: blob,
    payment: nat
): Promise<blob> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    // TODO this should use a Result remember
    return new Promise((resolve, reject) => {
        if (globalThis._azleIc === undefined) {
            return undefined as any;
        }

        const promiseId = v4();
        const globalResolveId = `_resolve_${promiseId}`;
        const globalRejectId = `_reject_${promiseId}`;

        // TODO perhaps we should be more robust
        // TODO for example, we can keep the time with these
        // TODO if they are over a certain amount old we can delete them
        globalThis._azleResolveIds[globalResolveId] = (bytes: ArrayBuffer) => {
            resolve(new Uint8Array(bytes));

            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
        };

        globalThis._azleRejectIds[globalRejectId] = (error: any) => {
            reject(error);

            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
        };

        const canisterIdBytes = canisterId.toUint8Array().buffer;
        const argsRawBuffer = argsRaw.buffer;
        const paymentCandidBytes = encode(nat, payment).buffer;

        // TODO consider finally, what if deletion goes wrong
        try {
            globalThis._azleIc.callRaw128(
                promiseId,
                canisterIdBytes,
                method,
                argsRawBuffer,
                paymentCandidBytes
            );
        } catch (error) {
            delete globalThis._azleResolveIds[globalResolveId];
            delete globalThis._azleRejectIds[globalRejectId];
            throw error;
        }
    });
}
