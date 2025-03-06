import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../../config';
import { Context } from '../../../types';
import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { CandidValueConstraints } from '../../candid_values_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { VecDefinitionArb } from './definition_arb';
import { VecValuesArb } from './values_arb';

export type Vec =
    | CorrespondingJSType[]
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | Int16Array
    | Int32Array
    | Int8Array
    | BigUint64Array
    | BigInt64Array;

export function VecArb(
    context: Context<CandidValueConstraints>
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    const definitionContext = {
        ...context,
        constraints: { depthLevel: DEFAULT_DEFINITION_MAX_DEPTH }
    };
    const valueContext = { ...context };
    return CandidValueAndMetaArbGenerator(
        valueContext,
        VecDefinitionArb(definitionContext, candidDefinitionMemo, []),
        VecValuesArb
    );
}
