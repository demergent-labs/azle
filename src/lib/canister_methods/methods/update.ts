import { CandidType } from '../../candid/candid_type';
import { TypeMapping } from '../../candid/type_mapping';
import { Callback } from '../types/callback';
import { CanisterMethodInfo } from '../types/canister_method_info';
import { executeMethod } from '../execute_method';
import { isAsync } from '../is_async';
import { MethodArgs } from '../types/method_args';

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
