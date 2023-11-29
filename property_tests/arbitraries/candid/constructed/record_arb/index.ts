import {
    CandidDefinitionArb,
    CorrespondingJSType
} from '../../candid_type_arb';
import { RecordArb as Base } from './base';

export type Record = {
    [x: string]: CorrespondingJSType;
};

export const RecordArb = Base(CandidDefinitionArb);
