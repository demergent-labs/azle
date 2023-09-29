import {
    MethodArgs,
    handleRecursiveParams,
    handleRecursiveReturn,
    isAsync,
    newTypesToStingArr
} from '../../lib_new/method_decorators';
import { Callback, CanisterMethodInfo, createParents, executeMethod } from '.';
import { CandidType, RecursiveResult, TypeMapping } from '../candid';

export function query<
    const Params extends ReadonlyArray<CandidType>,
    Return extends CandidType,
    GenericCallback extends Callback<Params, Return>
>(
    paramsIdls: Params,
    returnIdl: Return,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Return>
        ? GenericCallback
        : never,
    methodArgs?: MethodArgs
): (parent: RecursiveResult) => CanisterMethodInfo<Params, Return> {
    return (parent: any) => {
        const parents = createParents(parent);
        const paramCandid = handleRecursiveParams(paramsIdls as any, parents);
        const returnCandid = handleRecursiveReturn(
            returnIdl as any,
            paramCandid[2],
            parents
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
            candid: `(${paramCandid[1].join(', ')}) -> (${
                returnCandid[1]
            }) query;`,
            candidTypes: newTypesToStingArr(returnCandid[2]),
            paramsIdls: paramsIdls as any,
            returnIdl,
            async: callback === undefined ? false : isAsync(callback),
            guard: methodArgs?.guard
        };
    };
}
