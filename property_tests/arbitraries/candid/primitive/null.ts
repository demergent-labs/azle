import fc from 'fast-check';

import { Syntax } from '../../types';
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
    syntax: Syntax
): fc.Arbitrary<CandidValueAndMeta<null>> {
    return CandidValueAndMetaArbGenerator(
        NullDefinitionArb(syntax),
        NullValueArb
    );
}

export function NullDefinitionArb(
    syntax: Syntax
): WithShapesArb<NullCandidDefinition> {
    return SimpleCandidDefinitionArb('Null', syntax);
}

export function NullValueArb(): fc.Arbitrary<CandidValues<null>> {
    return SimpleCandidValuesArb(fc.constant(null), nullToSrcLiteral);
}
