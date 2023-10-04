import { CanisterMethodInfo, executeMethod, isAsync } from '.';
import { Void } from '../candid/types/primitive/void';

export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (...args: any[]) => {
        executeMethod('heartbeat', args, callback, [], Void, false);
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
