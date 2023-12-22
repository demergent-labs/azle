import fc from 'fast-check';

import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { VariantDefinitionArb } from './definition_arbs';
import { VariantValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { DEFAULT_DEF_MAX_DEPTH } from '../../../config';

export type Variant = {
    [x: string]: CorrespondingJSType;
};

export function VariantArb(): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return CandidValueAndMetaArbGenerator(
        VariantDefinitionArb(candidDefinitionMemo, [], {
            n: DEFAULT_DEF_MAX_DEPTH
        }),
        VariantValuesArb
    );
}
