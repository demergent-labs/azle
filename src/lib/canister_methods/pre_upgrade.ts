import { isAsync } from '../utils';
import { CanisterMethodInfo, executeMethod } from '.';
import { Void } from '../candid/reference/primitives';

export function preUpgrade(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return () => {
        const finalCallback = (...args: any[]) => {
            executeMethod(
                'preUpgrade',
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
            mode: 'preUpgrade',
            callback: finalCallback,
            paramsIdls: [],
            returnIdl: Void,
            async: isAsync(callback),
            guard: undefined
        };
    };
}
