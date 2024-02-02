import fc from 'fast-check';

import { candidDefinitionMemo } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { VecDefinitionArb } from './definition_arb';
import { VecValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';
import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../../config';
import { CandidValueConstraints } from '../../candid_values_arb';

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
    constraints?: CandidValueConstraints
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    return CandidValueAndMetaArbGenerator(
        VecDefinitionArb(candidDefinitionMemo, [], {
            depthLevel: DEFAULT_DEFINITION_MAX_DEPTH
        }),
        VecValuesArb,
        constraints
    );
}
