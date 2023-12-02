import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { Vec } from './index';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { VecDefinitionArb } from './definition_arb';
import { VecValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function VecArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    return CandidValueAndMetaArbGenerator(
        VecDefinitionArb(candidDefinitionArb),
        VecValuesArb
    );
}
