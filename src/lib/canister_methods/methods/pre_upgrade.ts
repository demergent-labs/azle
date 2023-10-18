import { Void } from '../../candid/types/primitive/void';
import { CanisterMethodInfo } from '../types/canister_method_info';
import { isAsync } from '../is_async';

export function preUpgrade(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return {
        mode: 'preUpgrade',
        callback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback),
        guard: undefined
    };
}
