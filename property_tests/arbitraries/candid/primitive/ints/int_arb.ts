import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';
import { CandidValues, IntCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const IntArb = SimpleCandidValueAndMetaArb(
    fc.bigInt(),
    CandidType.Int,
    bigintToSrcLiteral
);

export const IntDefinitionArb: fc.Arbitrary<IntCandidMeta> =
    SimpleCandidShapeArb(CandidType.Int);

export const IntValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValueArb(fc.bigInt(), bigintToSrcLiteral);
