import { CandidDefinitionArb } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { VariantArb as Base } from './base';

export type Variant = {
    [x: string]: CorrespondingJSType;
};

export const VariantArb = Base(CandidDefinitionArb);
