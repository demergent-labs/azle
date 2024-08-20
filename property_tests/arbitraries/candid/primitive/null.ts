import fc from 'fast-check';

import { Api } from '../../types';
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

export function NullArb(api: Api): fc.Arbitrary<CandidValueAndMeta<null>> {
    return CandidValueAndMetaArbGenerator(NullDefinitionArb(api), NullValueArb);
}

export function NullDefinitionArb(
    api: Api
): WithShapesArb<NullCandidDefinition> {
    return SimpleCandidDefinitionArb('Null', api);
}

export function NullValueArb(): fc.Arbitrary<CandidValues<null>> {
    return SimpleCandidValuesArb(fc.constant(null), nullToSrcLiteral);
}
