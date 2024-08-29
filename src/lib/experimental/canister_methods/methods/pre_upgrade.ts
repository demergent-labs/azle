import '../../experimental';

import { Void } from '../../candid/types/primitive/void';
import { isAsync } from '../is_async';
import { CanisterMethodInfo } from '../types/canister_method_info';

export function preUpgrade(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return {
        mode: 'preUpgrade',
        callback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback),
        index: globalThis._azleCanisterMethodsIndex++
    };
}
