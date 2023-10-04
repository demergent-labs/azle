import {
    Callback,
    CanisterMethodInfo,
    MethodArgs,
    createParents,
    executeMethod,
    isAsync
} from '.';
import { CandidType, TypeMapping } from '../candid';

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
        const finalCallback =
            callback === undefined
                ? undefined
                : (...args: any[]) => {
                      executeMethod(
                          'update',
                          args,
                          callback,
                          paramCandidTypes as any,
                          returnCandidType,
                          methodArgs?.manual ?? false,
                          createParents(parent)
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
