import { CandidDefinitionArb } from '../../definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { OptArb as Base } from './base';

export type Opt = [CorrespondingJSType] | never[];

export const OptArb = Base(CandidDefinitionArb);
