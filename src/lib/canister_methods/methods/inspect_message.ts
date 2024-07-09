import { Void } from '../../candid/types/primitive/void';
import { executeMethod } from '../execute_method';
import { CanisterMethodInfo } from '../types/canister_method_info';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (...args: any[]): void => {
        executeMethod('inspectMessage', args, callback, [], Void, false);
    };

    return {
        mode: 'inspectMessage',
        callback: finalCallback,
        paramCandidTypes: [],
        returnCandidType: Void,
        async: false,
        guard: undefined,
        index: globalThis._azleCanisterMethodsIndex++
    };
}
