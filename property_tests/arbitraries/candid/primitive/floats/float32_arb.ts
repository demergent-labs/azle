import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { floatToSrcLiteral } from '../../to_src_literal/float';
import { CandidType } from '../../candid_type';
import { CandidValues, FloatCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Float32Arb = SimpleCandidValueAndMetaArb(
    fc.float(),
    CandidType.Float32,
    floatToSrcLiteral
);

export const Float32DefinitionArb: fc.Arbitrary<FloatCandidMeta> =
    SimpleCandidShapeArb(CandidType.Float32);

export const Float32ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(fc.float(), floatToSrcLiteral);
