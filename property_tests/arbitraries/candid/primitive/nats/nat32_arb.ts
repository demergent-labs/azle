import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { UNumberArb } from './index';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { CandidValues, NatCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Nat32Arb = SimpleCandidValueAndMetaArb(
    UNumberArb(32),
    CandidType.Nat32,
    numberToSrcLiteral
);

export const Nat32DefinitionArb: fc.Arbitrary<NatCandidMeta> =
    SimpleCandidShapeArb(CandidType.Nat32);

export const Nat32ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(UNumberArb(32), numberToSrcLiteral);
