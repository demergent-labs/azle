import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { CandidValues, IntCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Int32Arb = SimpleCandidValueAndMetaArb(
    NumberArb(32),
    CandidType.Int32,
    numberToSrcLiteral
);

export const Int32DefinitionArb: fc.Arbitrary<IntCandidMeta> =
    SimpleCandidShapeArb(CandidType.Int32);

export const Int32ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(NumberArb(32), numberToSrcLiteral);
