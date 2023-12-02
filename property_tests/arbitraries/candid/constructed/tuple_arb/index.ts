import { CorrespondingJSType } from '../../corresponding_js_type';
import { CandidDefinitionArb } from '../../candid_definition_arb';
import { TupleArb as Base } from './base';

export type Tuple = CorrespondingJSType[];
export type ReturnTuple = Tuple | {};

export const TupleArb = Base(CandidDefinitionArb);
