import {
    CorrespondingJSType,
    CandidDefinitionArb
} from '../../candid_type_arb';
import { OptArb as Base } from './base';

export type Opt = [CorrespondingJSType] | never[];

export const OptArb = Base(CandidDefinitionArb);
