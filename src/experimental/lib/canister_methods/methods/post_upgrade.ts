import '../../experimental';

import { CandidType } from '../../candid/candid_type';
import { TypeMapping } from '../../candid/type_mapping';
import { Void } from '../../candid/types/primitive/void';
import { executeMethod } from '../execute_method';
import { Callback } from '../types/callback';
import { CanisterMethodInfo } from '../types/canister_method_info';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export function postUpgrade<
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
            : (): void => {
                  executeMethod(
                      'postUpgrade',
                      callback,
                      paramCandidTypes as unknown as CandidType[],
                      Void,
                      false
                  );
              };

    return {
        mode: 'postUpgrade',
        callback: finalCallback,
        paramCandidTypes: paramCandidTypes as unknown as CandidType[],
        returnCandidType: Void,
        async: false
    };
}
