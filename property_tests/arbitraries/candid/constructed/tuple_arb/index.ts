import { CandidType, CandidTypeArb } from '../../candid_type_arb';
import { TupleArb as Base } from './base';

export type Tuple = CandidType[];
export type ReturnTuple = Tuple | {};

export const TupleArb = Base(CandidTypeArb);
