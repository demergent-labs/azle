import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidDefinitionArb } from '../../candid_definition_arb/types';
import { OptDefinitionArb } from './definition_arb';
import { OptValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { candidDefinitionArb } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';

export type Opt = [CorrespondingJSType] | never[];

export function OptArb(
    arb: CandidDefinitionArb = candidDefinitionArb()
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return CandidValueAndMetaArbGenerator(OptDefinitionArb(arb), OptValuesArb);
}
