import {
    handleRecursiveParams,
    handleRecursiveReturn
} from '../../lib_new/method_decorators';
import { CanisterMethodInfo, executeMethod } from '.';

// TODO execute the candid stuff and just store it on the function itself?
export function query(
    paramsIdls: any,
    returnIdl: any,
    callback: any
): CanisterMethodInfo {
    const paramCandid = handleRecursiveParams(paramsIdls);
    const returnCandid = handleRecursiveReturn(returnIdl, paramCandid[2]);

    return {
        type: 'query',
        callback: (...args) => {
            executeMethod(paramCandid, returnCandid, args, callback);
        },
        candid: `(${paramCandid[1].join(', ')}) -> (${returnCandid[1]}) query;`
    };
}
