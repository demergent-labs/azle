import { Void } from '../../candid/types/primitive/void';
import { CanisterMethodInfo } from '../types/canister_method_info';
import { executeMethod } from '../execute_method';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (...args: any[]) => {
        executeMethod('inspectMessage', args, callback, [], Void, false);
    };

    return {
        mode: 'inspectMessage',
        callback: finalCallback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: false,
        guard: undefined
    };
}
