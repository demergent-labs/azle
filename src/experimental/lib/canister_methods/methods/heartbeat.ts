import '#experimental/lib/experimental';

import { trap } from '#lib/ic_apis/index';

import { Void } from '../../candid/types/primitive/void';
import { isAsync } from '../is_async';
import { CanisterMethodInfo } from '../types/canister_method_info';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return {
        mode: 'heartbeat',
        callback: () => executeHeartbeat(callback),
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback)
    };
}

function executeHeartbeat(callback: any): void {
    const result = callback();

    if (
        result !== undefined &&
        result !== null &&
        typeof result.then === 'function'
    ) {
        result.catch((error: any) => {
            trap(error.toString());
        });
    }

    return;
}
