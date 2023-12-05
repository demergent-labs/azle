import fc from 'fast-check';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { BoolCandidDefinition } from '../candid_definition_arb/types';
import { CandidValues } from '../candid_values_arb';

export function BoolArb(): fc.Arbitrary<any> {
    return CandidValueAndMetaArbGenerator(BoolDefinitionArb(), BoolValueArb);
}

export function BoolDefinitionArb(): fc.Arbitrary<BoolCandidDefinition> {
    return SimpleCandidDefinitionArb('bool');
}

export function BoolValueArb(): fc.Arbitrary<CandidValues<boolean>> {
    return SimpleCandidValuesArb(fc.boolean(), booleanToSrcLiteral);
}
