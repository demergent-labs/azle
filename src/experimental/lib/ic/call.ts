import '#experimental/lib/assert_experimental';

import { IDL } from '@dfinity/candid';
import { v4 } from 'uuid';

import { idlDecode } from '#lib/execute_with_candid_serde';
import { call as callStable } from '#lib/ic_apis/call';
import {
    getArgsRaw,
    getCanisterIdBytes,
    getCyclesString
} from '#lib/ic_apis/call';

export const call: typeof callStable = (canisterId, method, options) => {
    if (globalThis._azleIcExperimental === undefined) {
        return undefined as any;
    }

    if (typeof options?.timeout === 'number') {
        throw new Error('timeout is not yet implemented');
    }

    const canisterIdBytes = getCanisterIdBytes(canisterId);
    const argsRaw = getArgsRaw(options);
    const cyclesString = getCyclesString(options);

    if (options?.oneway === true) {
        return handleOneWay(canisterIdBytes, method, argsRaw, cyclesString);
    } else {
        return handleTwoWay<any>(
            canisterIdBytes,
            method,
            argsRaw,
            cyclesString,
            options?.raw ?? false,
            options?.returnIdlType
        );
    }
};

function handleOneWay(
    canisterIdBytes: Uint8Array,
    method: string,
    argsRaw: Uint8Array,
    cyclesString: string
): void {
    if (globalThis._azleIcExperimental === undefined) {
        throw new Error('globalThis._azleIcExperimental is not defined');
    }

    globalThis._azleIcExperimental.notifyRaw(
        canisterIdBytes.buffer instanceof ArrayBuffer
            ? canisterIdBytes.buffer
            : new Uint8Array(canisterIdBytes).buffer,
        method,
        argsRaw.buffer instanceof ArrayBuffer
            ? argsRaw.buffer
            : new Uint8Array(argsRaw).buffer,
        cyclesString
    );
}

function handleTwoWay<Return>(
    canisterIdBytes: Uint8Array,
    method: string,
    argsRaw: Uint8Array,
    cyclesString: string,
    raw: boolean,
    returnIdlType?: IDL.Type
): Promise<Return> {
    return new Promise((resolve, reject) => {
        if (globalThis._azleIcExperimental === undefined) {
            throw new Error('globalThis._azleIcExperimental is not defined');
        }

        const promiseId = v4();
        const globalResolveId = `_resolve_${promiseId}`;
        const globalRejectId = `_reject_${promiseId}`;

        createResolveCallback<Return>(
            globalResolveId,
            resolve,
            raw,
            returnIdlType
        );
        createRejectCallback(globalRejectId, reject);

        globalThis._azleIcExperimental.callRaw(
            globalResolveId,
            globalRejectId,
            canisterIdBytes.buffer instanceof ArrayBuffer
                ? canisterIdBytes.buffer
                : new Uint8Array(canisterIdBytes).buffer,
            method,
            argsRaw.buffer instanceof ArrayBuffer
                ? argsRaw.buffer
                : new Uint8Array(argsRaw).buffer,
            cyclesString
        );
    });
}

function createResolveCallback<Return>(
    globalResolveId: string,
    resolve: (value: Return | PromiseLike<Return>) => void,
    raw: boolean,
    returnIdlType?: IDL.Type
): void {
    globalThis._azleResolveCallbacks[globalResolveId] = (
        result: ArrayBuffer
    ): void => {
        if (raw === true) {
            resolve(new Uint8Array(result) as Return);
        } else {
            resolve(
                idlDecode(
                    returnIdlType === undefined ? [] : [returnIdlType],
                    new Uint8Array(result)
                )[0] as Return
            );
        }
    };
}

function createRejectCallback(
    globalRejectId: string,
    reject: (reason?: any) => void
): void {
    globalThis._azleRejectCallbacks[globalRejectId] = (
        error: unknown
    ): void => {
        reject(error);
    };
}
