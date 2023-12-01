import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { CandidType } from '../../candid_type';
import fc from 'fast-check';
import { IntCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Int32Arb = SimpleCandidValueAndMetaArb(
    NumberArb(32),
    CandidType.Int32,
    numberToSrcLiteral
);

export const Int32DefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidDefinitionArb(CandidType.Int32);

export const Int32ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(NumberArb(32), numberToSrcLiteral);
