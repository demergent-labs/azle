import { ic } from '../../ic';
import { Void } from '../../candid/types/primitive/void';
import { CanisterMethodInfo } from '../types/canister_method_info';
import { isAsync } from '../is_async';

export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return {
        mode: 'heartbeat',
        callback: () => executeHeartbeat(callback),
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback),
        guard: undefined
    };
}

function executeHeartbeat(callback: any) {
    const result = callback();

    if (
        result !== undefined &&
        result !== null &&
        typeof result.then === 'function'
    ) {
        result.catch((error: any) => {
            ic.trap(error.toString());
        });
    }

    return;
}
