import fc from 'fast-check';

import { Context } from '../../types';
import {
    NullCandidDefinition,
    WithShapesArb
} from '../candid_definition_arb/types';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValues } from '../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { nullToSrcLiteral } from '../to_src_literal/null';

export function NullArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<null>> {
    return CandidValueAndMetaArbGenerator(
        context,
        NullDefinitionArb(context),
        NullValueArb
    );
}

export function NullDefinitionArb(
    context: Context
): WithShapesArb<NullCandidDefinition> {
    return SimpleCandidDefinitionArb(context, 'Null');
}

export function NullValueArb(): fc.Arbitrary<CandidValues<null>> {
    return SimpleCandidValuesArb(fc.constant(null), nullToSrcLiteral);
}
