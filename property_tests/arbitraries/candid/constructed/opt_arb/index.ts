import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../../config';
import { Api } from '../../../types';
import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { ClassOptValuesArb } from './class_values_arb';
import { OptDefinitionArb } from './definition_arb';
import { FunctionalOptValuesArb } from './functional_values_arb';

export type Opt = [CorrespondingJSType] | never[];

export function OptArb(
    api: Api,
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    return CandidValueAndMetaArbGenerator(
        OptDefinitionArb(candidDefinitionMemo, [], api, {
            depthLevel: DEFAULT_DEFINITION_MAX_DEPTH
        }),
        api === 'functional' ? FunctionalOptValuesArb : ClassOptValuesArb,
        constraints
    );
}
