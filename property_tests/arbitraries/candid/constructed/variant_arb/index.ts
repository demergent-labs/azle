import fc from 'fast-check';

import { candidDefinitionArb } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { VariantDefinitionArb } from './definition_arbs';
import { VariantValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

export type Variant = {
    [x: string]: CorrespondingJSType;
};

export function VariantArb(
    fieldCandidDefinitionArb: fc.Arbitrary<CandidDefinition> = candidDefinitionArb()
): fc.Arbitrary<CandidValueAndMeta<Variant>> {
    return CandidValueAndMetaArbGenerator(
        VariantDefinitionArb(fieldCandidDefinitionArb),
        VariantValuesArb
    );
}
