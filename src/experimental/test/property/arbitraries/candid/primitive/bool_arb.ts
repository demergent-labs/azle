import fc from 'fast-check';

import { Context } from '../../types';
import { BoolCandidDefinition } from '../candid_definition_arb/types';
import { WithShapesArb } from '../candid_definition_arb/types';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValues } from '../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';

export function BoolArb(context: Context): fc.Arbitrary<any> {
    return CandidValueAndMetaArbGenerator(
        context,
        BoolDefinitionArb(context),
        BoolValueArb
    );
}

export function BoolDefinitionArb(
    context: Context
): WithShapesArb<BoolCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'bool');
}

export function BoolValueArb(): fc.Arbitrary<CandidValues<boolean>> {
    return SimpleCandidValuesArb(fc.boolean(), booleanToSrcLiteral);
}
