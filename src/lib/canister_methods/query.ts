import {
    Callback,
    CanisterMethodInfo,
    MethodArgs,
    createParents,
    executeMethod,
    isAsync
} from '.';
import {
    CandidType,
    TypeMapping,
    toParamIDLTypes,
    toReturnIDLType
} from '../candid';

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
): CanisterMethodInfo<Params, Return> {
    return (parent: any) => {
        const parents = createParents(parent);
        const paramCandid = toParamIDLTypes(paramsIdls as any, parents);
        const returnCandid = toReturnIDLType(returnIdl as any, parents);

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
            paramsIdls: paramsIdls as any,
            returnIdl,
            async: callback === undefined ? false : isAsync(callback),
            guard: methodArgs?.guard
        };
    };
}
