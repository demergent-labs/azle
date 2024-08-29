import '../../experimental';

import { Void } from '../../candid/types/primitive/void';
import { ic } from '../../ic';
import { isAsync } from '../is_async';
import { CanisterMethodInfo } from '../types/canister_method_info';

export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return {
        mode: 'heartbeat',
        callback: () => executeHeartbeat(callback),
        paramCandidTypes: [],
        returnCandidType: Void,
        async: isAsync(callback),
        index: globalThis._azleCanisterMethodsIndex++
    };
}

function executeHeartbeat(callback: any): void {
    const result = callback();

    if (
        result !== undefined &&
        result !== null &&
        typeof result.then === 'function'
    ) {
        result.catch((error: any) => {
            ic.trap(error.toString());
        });
    }

    return;
}
