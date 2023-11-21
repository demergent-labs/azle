import { CandidType, CandidTypeArb } from '../../candid_type_arb';
import { OptArb as Base } from './base';

export type Opt = [CandidType] | never[];

export const OptArb = Base(CandidTypeArb);
