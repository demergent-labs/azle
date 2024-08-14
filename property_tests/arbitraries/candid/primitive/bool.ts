import fc from 'fast-check';

import { Syntax } from '../../types';
import { BoolCandidDefinition } from '../candid_definition_arb/types';
import { WithShapesArb } from '../candid_definition_arb/types';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { CandidValues } from '../candid_values_arb';
import { SimpleCandidDefinitionArb } from '../simple_type_arbs/definition_arb';
import { SimpleCandidValuesArb } from '../simple_type_arbs/values_arb';
import { booleanToSrcLiteral } from '../to_src_literal/boolean';

export function BoolArb(syntax: Syntax): fc.Arbitrary<any> {
    return CandidValueAndMetaArbGenerator(
        BoolDefinitionArb(syntax),
        BoolValueArb
    );
}

export function BoolDefinitionArb(
    syntax: Syntax
): WithShapesArb<BoolCandidDefinition> {
    return SimpleCandidDefinitionArb('bool', syntax);
}

export function BoolValueArb(): fc.Arbitrary<CandidValues<boolean>> {
    return SimpleCandidValuesArb(fc.boolean(), booleanToSrcLiteral);
}
