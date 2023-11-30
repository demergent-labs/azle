import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { CandidValues, IntCandidDefinition } from '../../candid_meta_arb';
import { SimpleCandidShapeArb } from '../../simple_type_arbs/shape_arb';
import { SimpleCandidValueArb } from '../../simple_type_arbs/value_arb';

export const Int8Arb = SimpleCandidValueAndMetaArb(
    NumberArb(8),
    CandidType.Int8,
    numberToSrcLiteral
);

export const Int8DefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidShapeArb(CandidType.Int8);

export const Int8ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValueArb(NumberArb(8), numberToSrcLiteral);
