import fc from 'fast-check';
import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import { IntCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Int16Arb = SimpleCandidValueAndMetaArb(
    NumberArb(16),
    'int16',
    numberToSrcLiteral
);

export const Int16DefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidDefinitionArb('int16');

export const Int16ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(NumberArb(16), numberToSrcLiteral);
