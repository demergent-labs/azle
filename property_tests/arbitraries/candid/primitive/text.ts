import fc from 'fast-check';
import { stringToSrcLiteral } from '../to_src_literal/string';
import { TextCandidDefinition } from '../candid_definition_arb/types';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { CandidValues } from '../candid_values_arb';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';

export function TextArb(): fc.Arbitrary<CandidValueAndMeta<string>> {
    return CandidValueAndMetaArbGenerator(TextDefinitionArb(), TextValueArb);
}

export function TextDefinitionArb(): fc.Arbitrary<TextCandidDefinition> {
    return SimpleCandidDefinitionArb('text');
}

export function TextValueArb(): fc.Arbitrary<CandidValues<string>> {
    return SimpleCandidValuesArb(fc.string(), stringToSrcLiteral);
}
