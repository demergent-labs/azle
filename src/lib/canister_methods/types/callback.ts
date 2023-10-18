import { CandidType } from '../../candid/candid_type';
import { TypeMapping } from '../../candid/type_mapping';

export type Callback<
    Params extends ReadonlyArray<CandidType>,
    Return extends CandidType
> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return> | Promise<TypeMapping<Return>>;
