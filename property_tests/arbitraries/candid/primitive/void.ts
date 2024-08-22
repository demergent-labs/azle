import fc from 'fast-check';

import { Context } from '../../types';
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

export function VoidArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<undefined>> {
    return CandidValueAndMetaArbGenerator(
        context,
        VoidDefinitionArb(context),
        VoidValueArb
    );
}

export function VoidDefinitionArb(
    context: Context
): WithShapesArb<VoidCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'Void');
}

export function VoidValueArb(): fc.Arbitrary<CandidValues<undefined>> {
    return SimpleCandidValuesArb(fc.constant(undefined), voidToSrcLiteral);
}
