import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../../config';
import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { VariantDefinitionArb } from './definition_arbs';
import { VariantValuesArb } from './values_arb';

export type Variant = {
    [x: string]: CorrespondingJSType;
};

export function VariantArb(
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return CandidValueAndMetaArbGenerator(
        VariantDefinitionArb(candidDefinitionMemo, [], {
            depthLevel: DEFAULT_DEFINITION_MAX_DEPTH - 1
        }),
        VariantValuesArb,
        constraints
    );
}
