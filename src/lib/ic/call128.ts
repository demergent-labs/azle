import { nat } from '../candid/types/primitive/nats/nat';
import { callRaw128 } from './call_raw_128';
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
export function call128<T extends (...args: any[]) => any>(
    method: T,
    config?: {
        args?: ArgsType<T>;
        cycles?: nat;
    }
): ReturnTypeOf<T> {
    return (method as any).crossCanisterCallback(
        '_AZLE_CROSS_CANISTER_CALL',
        false,
        callRaw128,
        config?.cycles ?? 0n,
        ...(config?.args ?? [])
    );
}
