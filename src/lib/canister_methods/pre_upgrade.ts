import { CanisterMethodInfo, executeMethod, isAsync } from '.';
import { Void } from '../candid';

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
