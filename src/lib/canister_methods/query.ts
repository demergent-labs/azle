import {
    Callback,
    CanisterMethodInfo,
    MethodArgs,
    createParents,
    executeMethod,
    isAsync
} from '.';
import { CandidType, TypeMapping } from '../candid';

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
    return ((parent: any) => {
        // TODO maybe the cross canister callback should be made here?
        const finalCallback =
            callback === undefined
                ? undefined
                : (...args: any[]) => {
                      executeMethod(
                          'query',
                          args,
                          callback,
                          paramsIdls as any,
                          returnIdl,
                          methodArgs?.manual ?? false,
                          createParents(parent)
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
    }) as any;
}
