import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { Opt } from './index';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { OptDefinitionArb } from './definition_arb';
import { OptValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function OptArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return CandidValueAndMetaArbGenerator(
        OptDefinitionArb(candidDefinitionArb),
        OptValuesArb
    );
}
