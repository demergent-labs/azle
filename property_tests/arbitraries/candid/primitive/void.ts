import fc from 'fast-check';
import { voidToSrcLiteral } from '../to_src_literal/void';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import {
    VoidCandidDefinition,
    WithShapesArb
} from '../candid_definition_arb/types';
import { CandidValues } from '../candid_values_arb';

export function VoidArb(): fc.Arbitrary<CandidValueAndMeta<undefined>> {
    return CandidValueAndMetaArbGenerator(VoidDefinitionArb(), VoidValueArb);
}

export function VoidDefinitionArb(): WithShapesArb<VoidCandidDefinition> {
    return SimpleCandidDefinitionArb('Void');
}

export function VoidValueArb(): fc.Arbitrary<CandidValues<undefined>> {
    return SimpleCandidValuesArb(fc.constant(undefined), voidToSrcLiteral);
}
