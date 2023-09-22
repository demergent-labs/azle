import {
    handleRecursiveParams,
    handleRecursiveReturn,
    newTypesToStingArr
} from '../../lib_new/method_decorators';
import { Callback, CanisterMethodInfo, executeMethod } from '.';
import { TypeMapping } from '../candid';

export function query<
    const Params extends ReadonlyArray<any>,
    Return,
    GenericCallback extends Callback<Params, Return>
>(
    paramsIdls: Params,
    returnIdl: Return,
    callback: ReturnType<GenericCallback> extends TypeMapping<Return>
        ? GenericCallback
        : never
): CanisterMethodInfo {
    const paramCandid = handleRecursiveParams(paramsIdls as any);
    const returnCandid = handleRecursiveReturn(
        returnIdl as any,
        paramCandid[2]
    );

    return {
        type: 'query',
        callback: (...args) => {
            executeMethod(paramCandid, returnCandid, args, callback);
        },
        candid: `(${paramCandid[1].join(', ')}) -> (${returnCandid[1]}) query;`,
        candidTypes: newTypesToStingArr(returnCandid[2])
    };
}
