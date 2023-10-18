import { CandidType, TypeMapping } from '../../candid';

export type Callback<
    Params extends ReadonlyArray<CandidType>,
    Return extends CandidType
> = (
    ...args: { [K in keyof Params]: TypeMapping<Params[K]> }
) => TypeMapping<Return> | Promise<TypeMapping<Return>>;
