import { isAsync } from '../utils';
import { CanisterMethodInfo, executeMethod } from '.';
import { Void } from '../candid/reference/primitives';

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
