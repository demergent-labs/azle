import fc from 'fast-check';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { Variant } from '.';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { VariantDefinitionArb } from './definition_arbs';
import { VariantValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export function VariantArb(
    candidDefinitionArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return CandidValueAndMetaArbGenerator(
        VariantDefinitionArb(candidDefinitionArb),
        VariantValuesArb
    );
}
