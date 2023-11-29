import { CandidCoolTypeArb, CandidType } from '../../candid_type_arb';
import { RecordArb as Base } from './base';

export type Record = {
    [x: string]: CandidType;
};

export const RecordArb = Base(CandidCoolTypeArb);
