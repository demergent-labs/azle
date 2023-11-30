import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';
import { CandidValues, NatCandidDefinition } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const NatArb = SimpleCandidValueAndMetaArb(
    fc.bigUint(),
    CandidType.Nat,
    bigintToSrcLiteral
);

export const NatDefinitionArb: fc.Arbitrary<NatCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Nat);

export const NatValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValueArb(fc.bigUint(), bigintToSrcLiteral);
