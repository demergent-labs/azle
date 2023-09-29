import { isAsync } from '../../lib_new/method_decorators';
import { CanisterMethodInfo, executeMethod } from '.';
import { Void } from '../../lib_new';

export function preUpgrade(
    callback: () => void | Promise<void>
): () => CanisterMethodInfo<[], Void> {
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
            candid: '',
            candidTypes: [],
            paramsIdls: [],
            returnIdl: Void,
            async: isAsync(callback),
            guard: undefined
        };
    };
}
