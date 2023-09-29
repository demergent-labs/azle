import { CanisterMethodInfo, createParents, executeMethod } from '.';
import {
    Void,
    handleRecursiveParams,
    handleRecursiveReturn
} from '../../lib_new';
import { RecursiveType } from '../candid';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return (parent: any) => {
        const parents = createParents(parent);
        // TODO why are we doing this handle recursive params when there are none?
        const paramCandid = handleRecursiveParams([], parents);
        const returnCandid = handleRecursiveReturn(
            Void as any,
            paramCandid[2],
            parents
        );

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
    };
}
