import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { FloatCandidDefinition } from '../../definition_arb/types';
import { CandidValues } from '../../values';

export const Float64Arb = SimpleCandidValueAndMetaArb(
    float64(),
    'float64',
    floatToSrcLiteral
);

export const Float64DefinitionArb: fc.Arbitrary<FloatCandidDefinition> =
    SimpleCandidDefinitionArb('float64');

export const Float64ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(float64(), floatToSrcLiteral);

function float64(): fc.Arbitrary<number> {
    return fc
        .float64Array({ maxLength: 1, minLength: 1 })
        .map((sample) => sample[0]);
}
