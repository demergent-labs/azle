import { nat64 } from '../candid/types/primitive/nats/nat64';
import { callRaw } from './call_raw';
import { ArgsType, ReturnTypeOf } from './types';

/**
 * Performs an asynchronous call to another canister.
 *
 * Note that the asynchronous call must be awaited in order for the
 * inter-canister call to be made using the System API.
 *
 * @param method
 * @param config
 * @returns
 */
export function call<T extends (...args: any[]) => any>(
    method: T,
    config?: {
        args?: ArgsType<T>;
        cycles?: nat64;
    }
): ReturnTypeOf<T> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    // TODO probably get rid of .crossCanisterCallback
    return (method as any).crossCanisterCallback(
        '_AZLE_CROSS_CANISTER_CALL',
        false,
        callRaw,
        config?.cycles ?? 0n,
        ...(config?.args ?? [])
    );
}
