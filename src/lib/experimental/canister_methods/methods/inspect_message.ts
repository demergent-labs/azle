import '../../experimental';

import { Void } from '../../candid/types/primitive/void';
import { executeMethod } from '../execute_method';
import { CanisterMethodInfo } from '../types/canister_method_info';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (): void => {
        executeMethod('inspectMessage', [], callback, [], Void, false);
    };

    return {
        mode: 'inspectMessage',
        callback: finalCallback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: false,
        index: globalThis._azleCanisterMethodsIndex++
    };
}
