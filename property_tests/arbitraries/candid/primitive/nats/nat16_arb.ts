import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { CandidValues, NatCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Nat16Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(16),
    CandidType.Nat16,
    numberToSrcLiteral
);

export const Nat16DefinitionArb: fc.Arbitrary<NatCandidMeta> =
    SimpleCandidShapeArb(CandidType.Nat16);

export const Nat16ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(UNumberArb(16), numberToSrcLiteral);
