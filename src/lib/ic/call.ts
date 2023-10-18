import { nat } from '../candid/types/primitive/nats/nat';
import { nat64 } from '../candid/types/primitive/nats/nat64';
import { callRaw } from './call_raw';
import { callRaw128 } from './call_raw_128';
import { ArgsType } from './types/args_type';
import { ReturnTypeOf } from './types/return_type_of';

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
        cycles128?: nat;
    }
): ReturnTypeOf<T> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const { callFunction, cycles } = getCallFunctionAndCycles(
        config?.cycles,
        config?.cycles128
    );

    return method(false, callFunction, cycles, ...(config?.args ?? []));
}

function getCallFunctionAndCycles(
    cycles: nat64 | undefined,
    cycles128: nat | undefined
): {
    callFunction: any;
    cycles: bigint;
} {
    if (cycles128 !== undefined) {
        return {
            callFunction: callRaw128,
            cycles: cycles128
        };
    }

    return {
        callFunction: callRaw,
        cycles: cycles ?? 0n
    };
}
