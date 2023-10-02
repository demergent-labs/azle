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

export function update<
    const Params extends ReadonlyArray<CandidType>,
    Return extends CandidType,
    GenericCallback extends Callback<Params, Return>
>(
    paramCandidTypes: Params,
    returnCandidType: Return,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Return>
        ? GenericCallback
        : never,
    methodArgs?: MethodArgs
): CanisterMethodInfo<Params, Return> {
    return (parent: any) => {
        const parents = createParents(parent);
        const paramIdls = toParamIDLTypes(paramCandidTypes as any, parents);
        const returnIdls = toReturnIDLType(returnCandidType as any, parents);

        const finalCallback =
            callback === undefined
                ? undefined
                : (...args: any[]) => {
                      executeMethod(
                          'update',
                          paramIdls,
                          returnIdls,
                          args,
                          callback,
                          paramCandidTypes as any,
                          returnCandidType,
                          methodArgs?.manual ?? false
                      );
                  };

        return {
            mode: 'update',
            callback: finalCallback,
            paramsIdls: paramCandidTypes as any,
            returnIdl: returnCandidType,
            async: callback === undefined ? false : isAsync(callback),
            guard: methodArgs?.guard
        };
    };
}
