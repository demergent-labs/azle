import {
    handleRecursiveParams,
    handleRecursiveReturn,
    newTypesToStingArr
} from '../../lib_new/method_decorators';
import { Callback, CanisterMethodInfo, executeMethod } from '.';

export function update<Params extends any[], Return>(
    paramsIdls: Params,
    returnIdl: Return,
    callback: Callback<Params, Return>
): CanisterMethodInfo {
    const paramCandid = handleRecursiveParams(paramsIdls);
    const returnCandid = handleRecursiveReturn(
        returnIdl as any,
        paramCandid[2]
    );

    return {
        type: 'update',
        callback: (...args) => {
            executeMethod(paramCandid, returnCandid, args, callback);
        },
        candid: `(${paramCandid[1].join(', ')}) -> (${returnCandid[1]});`,
        candidTypes: newTypesToStingArr(returnCandid[2])
    };
}
