import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../../config';
import { Context } from '../../../types';
import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { OptDefinitionArb } from './definition_arb';
import { OptValuesArb } from './values_arb';

export type Opt = [CorrespondingJSType] | never[];

export function OptArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValueAndMeta<Opt>> {
    const definitionContext = {
        ...context,
        constraints: { depthLevel: DEFAULT_DEFINITION_MAX_DEPTH }
    };
    return CandidValueAndMetaArbGenerator(
        context,
        OptDefinitionArb(definitionContext, candidDefinitionMemo, []),
        OptValuesArb
    );
}
