import fc from 'fast-check';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';

export function Float32Arb(): fc.Arbitrary<CandidValueAndMeta<number>> {
    return CandidValueAndMetaArbGenerator(
        Float32DefinitionArb,
        () => Float32ValueArb
    );
}

export const Float32DefinitionArb = SimpleCandidDefinitionArb('float32');

export const Float32ValueArb = SimpleCandidValuesArb(
    fc.float(),
    floatToSrcLiteral
);
