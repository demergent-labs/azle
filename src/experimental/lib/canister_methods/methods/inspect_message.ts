import '#experimental/lib/experimental';

import { Void } from '../../candid/types/primitive/void';
import { executeMethod } from '../execute_method';
import { CanisterMethodInfo } from '../types/canister_method_info';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (): void => {
        executeMethod('inspectMessage', callback, [], Void, false);
    };

    return {
        mode: 'inspectMessage',
        callback: finalCallback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: false
    };
}
