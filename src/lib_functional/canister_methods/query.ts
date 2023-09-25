import {
    MethodArgs,
    handleRecursiveParams,
    handleRecursiveReturn,
    isAsync,
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
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Return>
        ? GenericCallback
        : never,
    methodArgs?: MethodArgs
): CanisterMethodInfo<Params, Return> {
    const paramCandid = handleRecursiveParams(paramsIdls as any);
    const returnCandid = handleRecursiveReturn(
        returnIdl as any,
        paramCandid[2]
    );

    // TODO maybe the cross canister callback should be made here?
    const finalCallback =
        callback === undefined
            ? undefined
            : (...args: any[]) => {
                  executeMethod(
                      'query',
                      paramCandid,
                      returnCandid,
                      args,
                      callback,
                      paramsIdls as any,
                      returnIdl,
                      methodArgs?.manual ?? false
                  );
              };

    return {
        mode: 'query',
        callback: finalCallback,
        candid: `(${paramCandid[1].join(', ')}) -> (${returnCandid[1]}) query;`,
        candidTypes: newTypesToStingArr(returnCandid[2]),
        paramsIdls: paramsIdls as any,
        returnIdl,
        async: callback === undefined ? false : isAsync(callback),
        guard: methodArgs?.guard
    };
}
