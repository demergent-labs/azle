import { CanisterMethodInfo, executeMethod, isAsync } from '.';
import { Void } from '../candid/';

export function heartbeat(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return () => {
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
            paramsIdls: [],
            returnIdl: Void,
            async: isAsync(callback),
            guard: undefined
        };
    };
}
