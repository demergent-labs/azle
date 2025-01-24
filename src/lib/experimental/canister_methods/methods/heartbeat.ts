import '../../experimental';

import { trap } from '../../../stable/ic_apis';
import { Void } from '../../candid/types/primitive/void';
import { isAsync } from '../is_async';
import { CanisterMethodInfo } from '../types/canister_method_info';

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
