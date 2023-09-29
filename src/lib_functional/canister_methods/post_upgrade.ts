import {
    handleRecursiveParams,
    handleRecursiveReturn,
    newTypesToStingArr
} from '../../lib_new/method_decorators';
import { Callback, CanisterMethodInfo, createParents, executeMethod } from '.';
import { CandidType, TypeMapping } from '../candid';
import { Void } from '../../lib_new';

export function postUpgrade<
    const Params extends ReadonlyArray<CandidType>,
    GenericCallback extends Callback<Params, Void>
>(
    paramsIdls: Params,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Void>
        ? GenericCallback
        : never
): CanisterMethodInfo<Params, Void> {
    return (parent: any) => {
        const parents = createParents(parent);
        const paramCandid = handleRecursiveParams(paramsIdls as any, parents);
        const returnCandid = handleRecursiveReturn(
            Void as any,
            paramCandid[2],
            parents
        );

        const finalCallback =
            callback === undefined
                ? undefined
                : (...args: any[]) => {
                      executeMethod(
                          'postUpgrade',
                          paramCandid,
                          returnCandid,
                          args,
                          callback,
                          paramsIdls as any,
                          Void,
                          false
                      );
                  };

        return {
            mode: 'postUpgrade',
            callback: finalCallback,
            candid: paramCandid[1].join(', '),
            candidTypes: newTypesToStingArr(returnCandid[2]),
            paramsIdls: paramsIdls as any,
            returnIdl: Void,
            async: false,
            guard: undefined
        };
    };
}
