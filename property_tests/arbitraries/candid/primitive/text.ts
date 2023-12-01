import fc from 'fast-check';
import { stringToSrcLiteral } from '../to_src_literal/string';
import { TextCandidDefinition } from '../definition_arb/types';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { CandidValues } from '../values';
import { CandidValueAndMeta } from '../value_and_meta_arb';
import { ComplexCandidValueAndMetaArb } from '../complex_value_and_meta_arb';

export function TextArb(): fc.Arbitrary<CandidValueAndMeta<string>> {
    return ComplexCandidValueAndMetaArb(TextDefinitionArb(), TextValueArb);
}

export function TextDefinitionArb(): fc.Arbitrary<TextCandidDefinition> {
    return SimpleCandidDefinitionArb('text');
}

export function TextValueArb(): fc.Arbitrary<CandidValues<string>> {
    return SimpleCandidValuesArb(fc.string(), stringToSrcLiteral);
}
