import { CanisterMethodInfo, executeMethod } from '.';
import { Void } from '../candid/types/primitive/void';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return (() => {
        const finalCallback = (...args: any[]) => {
            executeMethod(
                'inspectMessage',
                args,
                callback,
                [],
                Void,
                false,
                []
            );
        };

        return {
            mode: 'inspectMessage',
            callback: finalCallback,
            paramsIdls: [],
            returnIdl: Void,
            async: false,
            guard: undefined
        };
    }) as any;
}
