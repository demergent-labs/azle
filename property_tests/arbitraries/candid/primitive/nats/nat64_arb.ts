import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { CandidType } from '../../candid_type';
import { CandidValues, NatCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Nat64Arb = SimpleCandidValueAndMetaArb(
    fc.bigUintN(64),
    CandidType.Nat64,
    bigintToSrcLiteral
);

export const Nat64TypeArb: fc.Arbitrary<NatCandidMeta> = SimpleCandidShapeArb(
    CandidType.Nat64
);

export const Nat64ValueArb: fc.Arbitrary<CandidValues<bigint>> =
    SimpleCandidValueArb(fc.bigUintN(64), bigintToSrcLiteral);
