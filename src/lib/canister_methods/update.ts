import {
    Callback,
    CanisterMethodInfo,
    MethodArgs,
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
    const finalCallback =
        callback === undefined
            ? undefined
            : (...args: any[]) => {
                  executeMethod(
                      'update',
                      args,
                      callback,
                      paramCandidTypes as unknown as CandidType[],
                      returnCandidType,
                      methodArgs?.manual ?? false
                  );
              };

    return {
        mode: 'update',
        callback: finalCallback,
        paramCandidTypes: paramCandidTypes as unknown as CandidType[],
        returnCandidType,
        async: callback === undefined ? false : isAsync(callback),
        guard: methodArgs?.guard
    };
}
