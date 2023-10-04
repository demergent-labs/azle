import { CanisterMethodInfo, executeMethod, isAsync } from '.';
import { Void } from '../candid/types/primitive/void';

export function preUpgrade(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return (() => {
        const finalCallback = (...args: any[]) => {
            executeMethod('preUpgrade', args, callback, [], Void, false, []);
        };

        return {
            mode: 'preUpgrade',
            callback: finalCallback,
            paramCandidTypes: [],
            returnCandidType: Void,
            async: isAsync(callback),
            guard: undefined
        } as CanisterMethodInfo<[], Void>;
    }) as any;
}
