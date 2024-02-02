import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { OptDefinitionArb } from './definition_arb';
import { OptValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../../config';
import { CandidValueConstraints } from '../../candid_values_arb';

export type Opt = [CorrespondingJSType] | never[];

export function OptArb(
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return CandidValueAndMetaArbGenerator(
        OptDefinitionArb(candidDefinitionMemo, [], {
            depthLevel: DEFAULT_DEFINITION_MAX_DEPTH
        }),
        OptValuesArb,
        constraints
    );
}
