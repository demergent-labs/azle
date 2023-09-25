import { isAsync } from '../../lib_new/method_decorators';
import { CanisterMethodInfo, executeMethod } from '.';
import { Void } from '../../lib_new';

export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const finalCallback = (...args: any[]) => {
        executeMethod(
            'heartbeat',
            undefined,
            undefined,
            args,
            callback,
            [],
            Void,
            false
        );
    };

    return {
        mode: 'heartbeat',
        callback: finalCallback,
        candid: '',
        candidTypes: [],
        paramsIdls: [],
        returnIdl: Void,
        async: isAsync(callback),
        guard: undefined
    };
}
