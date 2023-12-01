import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { ComplexCandidValueAndMetaArb } from '../../complex_value_and_meta_arb';

export function Float64Arb() {
    return ComplexCandidValueAndMetaArb(
        Float64DefinitionArb,
        () => Float64ValueArb
    );
}

export const Float64DefinitionArb = SimpleCandidDefinitionArb('float64');

export const Float64ValueArb = SimpleCandidValuesArb(
    float64(),
    floatToSrcLiteral
);

function float64(): fc.Arbitrary<number> {
    return fc
        .float64Array({ maxLength: 1, minLength: 1 })
        .map((sample) => sample[0]);
}
