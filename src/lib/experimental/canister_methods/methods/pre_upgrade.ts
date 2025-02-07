import '../../experimental';

import { Void } from '../../candid/types/primitive/void';
import { isAsync } from '../is_async';
import { CanisterMethodInfo } from '../types/canister_method_info';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function preUpgrade(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return {
        mode: 'preUpgrade',
        callback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback)
    };
}
