import '../experimental';

import { nat } from '../candid/types/primitive/nats/nat';
import { callRaw } from './call_raw';
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
        cycles?: nat;
    }
): ReturnTypeOf<T> {
    if (globalThis._azleIc === undefined) {
        return undefined as any;
    }

    const { callFunction, cycles } = getCallFunctionAndCycles(config?.cycles);

    return method(false, callFunction, cycles, config?.args ?? []);
}

function getCallFunctionAndCycles(cycles: nat | undefined): {
    callFunction: any;
    cycles: bigint;
} {
    return {
        callFunction: callRaw,
        cycles: cycles ?? 0n
    };
}
