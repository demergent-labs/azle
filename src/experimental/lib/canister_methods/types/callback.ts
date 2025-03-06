import '#experimental/lib/assert_experimental';

import { CandidType } from '../../candid/candid_type';
import { TypeMapping } from '../../candid/type_mapping';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export type Callback<
    Params extends ReadonlyArray<CandidType>,
    Return extends CandidType
> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return> | Promise<TypeMapping<Return>>;
