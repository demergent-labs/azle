import { numberToSrcLiteral } from '../../to_src_literal/number';
import { SimpleCandidValueAndMetaArb } from '../../simple_type_arbs/value_and_meta_arb';
import { NumberArb } from './';
import fc from 'fast-check';
import { IntCandidDefinition } from '../../definition_arb/types';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValues } from '../../values';

export const Int8Arb = SimpleCandidValueAndMetaArb(
    NumberArb(8),
    'int8',
    numberToSrcLiteral
);

export const Int8DefinitionArb: fc.Arbitrary<IntCandidDefinition> =
    SimpleCandidDefinitionArb('int8');

export const Int8ValueArb: fc.Arbitrary<CandidValues<number>> =
    SimpleCandidValuesArb(NumberArb(8), numberToSrcLiteral);
