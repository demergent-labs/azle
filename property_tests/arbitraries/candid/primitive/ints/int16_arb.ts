import fc from 'fast-check';
import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { CandidType } from '../../candid_type';
import { CandidValues, IntCandidMeta } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Int16Arb = SimpleCandidValueAndMetaArb(
    NumberArb(16),
    CandidType.Int16,
    numberToSrcLiteral
);

export const Int16DefinitionArb: fc.Arbitrary<IntCandidMeta> =
    SimpleCandidShapeArb(CandidType.Int16);

export const Int16ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(NumberArb(16), numberToSrcLiteral);
