import fc from 'fast-check';
import { SimpleCandidValueAndMetaArb } from '../simple_type_arbs/value_and_meta_arb';
import { stringToSrcLiteral } from '../to_src_literal/string';
import { TextCandidDefinition } from '../definition_arb/types';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { CandidValues } from '../values';

export const TextArb = SimpleCandidValueAndMetaArb(
    fc.string(),
    'text',
    stringToSrcLiteral
);

export const TextDefinitionArb: fc.Arbitrary<TextCandidDefinition> =
    SimpleCandidDefinitionArb('text');

export const TextValueArb: fc.Arbitrary<CandidValues<string>> =
    SimpleCandidValuesArb(fc.string(), stringToSrcLiteral);
