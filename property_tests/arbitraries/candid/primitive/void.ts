import fc from 'fast-check';

import {
    VoidCandidDefinition,
    WithShapesArb
} from '../candid_definition_arb/types';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValues } from '../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { voidToSrcLiteral } from '../to_src_literal/void';

export function VoidArb(): fc.Arbitrary<CandidValueAndMeta<undefined>> {
    return CandidValueAndMetaArbGenerator(VoidDefinitionArb(), VoidValueArb);
}

export function VoidDefinitionArb(): WithShapesArb<VoidCandidDefinition> {
    return SimpleCandidDefinitionArb('Void');
}

export function VoidValueArb(): fc.Arbitrary<CandidValues<undefined>> {
    return SimpleCandidValuesArb(fc.constant(undefined), voidToSrcLiteral);
}
