import { CandidType } from '../../candid/candid_type';
import { TypeMapping } from '../../candid/type_mapping';
import { Void } from '../../candid/types/primitive/void';
import { Callback } from '../types/callback';
import { CanisterMethodInfo } from '../types/canister_method_info';
import { executeMethod } from '../execute_method';

export function init<
    const Params extends ReadonlyArray<CandidType>,
    GenericCallback extends Callback<Params, typeof Void>
>(
    paramCandidTypes: Params,
    callback?: Awaited<ReturnType<GenericCallback>> extends TypeMapping<Void>
        ? GenericCallback
        : never
): CanisterMethodInfo<Params, Void> {
    const finalCallback =
        callback === undefined
            ? undefined
            : (...args: any[]) => {
                  executeMethod(
                      'init',
                      args,
                      callback,
                      paramCandidTypes as unknown as CandidType[],
                      Void,
                      false
                  );
              };

    return {
        mode: 'init',
        callback: finalCallback,
        paramCandidTypes: paramCandidTypes as any,
        returnCandidType: Void,
        async: false,
        guard: undefined
    };
}
