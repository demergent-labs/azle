import { Callback, CanisterMethodInfo, createParents, executeMethod } from '.';
import { CandidType, RecursiveType, TypeMapping } from '../candid';
import { Void } from '../../lib_new';
import { toParamIDLTypes, toReturnIDLType } from '../../lib_new/utils';

export function postUpgrade<
    const Params extends ReadonlyArray<CandidType>,
    GenericCallback extends Callback<Params, Void>
>(
    paramsIdls: Params,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Void>
        ? GenericCallback
        : never
): (parent: RecursiveType) => CanisterMethodInfo<Params, Void> {
    return (parent: any) => {
        const parents = createParents(parent);
        const paramCandid = toParamIDLTypes(paramsIdls as any, parents);
        const returnCandid = toReturnIDLType(Void as any, parents);

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
            paramsIdls: paramsIdls as any,
            returnIdl: Void,
            async: false,
            guard: undefined
        };
    };
}
