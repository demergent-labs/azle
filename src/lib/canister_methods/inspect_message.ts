import { CanisterMethodInfo, createParents, executeMethod } from '.';
import { Void, toParamIDLTypes, toReturnIDLType } from '../candid/';

export function inspectMessage(
    callback: () => void | Promise<void>
): CanisterMethodInfo<[], Void> {
    return (parent: any) => {
        const parents = createParents(parent);
        // TODO why are we doing this handle recursive params when there are none?
        const paramCandid = toParamIDLTypes([], parents);
        const returnCandid = toReturnIDLType(Void as any, parents);

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
            paramsIdls: [],
            returnIdl: Void,
            async: false,
            guard: undefined
        };
    };
}
