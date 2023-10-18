import { CanisterMethodInfo, executeMethod, isAsync } from '.';
import { ic } from '../ic';
import { Void } from '../candid/types/primitive/void';

export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = () => {
        executeHeartbeat(callback);
    };

    return {
        mode: 'heartbeat',
        callback: finalCallback,
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
