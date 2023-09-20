import {
    handleRecursiveParams,
    handleRecursiveReturn
} from '../../lib_new/method_decorators';
import { CanisterMethodInfo, executeMethod } from '.';

export function update(
    paramsIdls: any,
    returnIdl: any,
    callback: any
): CanisterMethodInfo {
    const paramCandid = handleRecursiveParams(paramsIdls);
    const returnCandid = handleRecursiveReturn(returnIdl, paramCandid[2]);

    return {
        type: 'update',
        callback: (...args) => {
            executeMethod(paramCandid, returnCandid, args, callback);
        },
        candid: `(${paramCandid[1].join(', ')}) -> (${returnCandid[1]});`
    };
}
