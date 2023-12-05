import fc from 'fast-check';
import { bigintToSrcLiteral } from '../../to_src_literal/bigint';
import { SimpleCandidDefinitionArb } from '../../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValues } from '../../candid_values_arb';
import { IntCandidDefinition } from '../../candid_definition_arb/types';

export function IntArb(): fc.Arbitrary<CandidValueAndMeta<bigint>> {
    return CandidValueAndMetaArbGenerator(IntDefinitionArb(), IntValueArb);
}

export function IntDefinitionArb(): fc.Arbitrary<IntCandidDefinition> {
    return SimpleCandidDefinitionArb('int');
}

export function IntValueArb(): fc.Arbitrary<CandidValues<bigint>> {
    return SimpleCandidValuesArb(fc.bigInt(), bigintToSrcLiteral);
}
