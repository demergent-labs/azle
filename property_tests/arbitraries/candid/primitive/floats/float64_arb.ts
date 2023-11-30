import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { CandidType } from '../../candid_type';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';
import { CandidValues, FloatCandidDefinition } from '../../candid_meta_arb';

function float64(): fc.Arbitrary<number> {
    return fc
        .float64Array({ maxLength: 1, minLength: 1 })
        .map((sample) => sample[0]);
}

export const Float64Arb = SimpleCandidValueAndMetaArb(
    float64(),
    CandidType.Float64,
    floatToSrcLiteral
);

export const Float64DefinitionArb: fc.Arbitrary<FloatCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Float64);

export const Float64ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(float64(), floatToSrcLiteral);
