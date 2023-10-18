import { CanisterMethodInfo, executeMethod, isAsync } from '.';
import { Void } from '../candid/types/primitive/void';

export function preUpgrade(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (...args: any[]) => {
        callback();
    };

    return {
        mode: 'preUpgrade',
        callback: finalCallback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback),
        guard: undefined
    };
}
