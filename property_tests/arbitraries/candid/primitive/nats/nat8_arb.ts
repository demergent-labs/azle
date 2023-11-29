import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { CandidValues, NatCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Nat8Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(8),
    CandidType.Nat8,
    numberToSrcLiteral
);

export const Nat8TypeArb: fc.Arbitrary<NatCandidMeta> = SimpleCandidShapeArb(
    CandidType.Nat8
);

export const Nat8ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(UNumberArb(8), numberToSrcLiteral);
