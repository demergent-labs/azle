import { CanisterMethodInfo, executeMethod } from '.';
import {
    Void,
    handleRecursiveParams,
    handleRecursiveReturn
} from '../../lib_new';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    const paramCandid = handleRecursiveParams([]);
    const returnCandid = handleRecursiveReturn(Void as any, paramCandid[2]);

    const finalCallback = (...args: any[]) => {
        executeMethod(
            'inspectMessage',
            paramCandid,
            returnCandid,
            args,
            callback,
            [],
            Void,
            false
        );
    };

    return {
        mode: 'inspectMessage',
        callback: finalCallback,
        candid: '',
        candidTypes: [],
        paramsIdls: [],
        returnIdl: Void,
        async: false,
        guard: undefined
    };
}
