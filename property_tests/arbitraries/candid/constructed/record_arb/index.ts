import { CandidDefinitionArb } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { RecordArb as Base } from './base';

export type Record = {
    [x: string]: CorrespondingJSType;
};

export const RecordArb = Base(CandidDefinitionArb);
