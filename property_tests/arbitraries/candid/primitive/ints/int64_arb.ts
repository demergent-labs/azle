import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';
import { CandidValues, IntCandidDefinition } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Int64Arb = SimpleCandidValueAndMetaArb(
    fc.bigIntN(64),
    CandidType.Int64,
    bigintToSrcLiteral
);

export const Int64DefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Int64);

export const Int64ValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValueArb(fc.bigIntN(64), bigintToSrcLiteral);
