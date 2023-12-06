import fc from 'fast-check';

import { candidDefinitionArb } from '../../candid_definition_arb';
import { CorrespondingJSType } from '../../corresponding_js_type';
import { CandidValueAndMeta } from '../../candid_value_and_meta_arb';
import { CandidDefinition } from '../../candid_definition_arb/types';
import { VecDefinitionArb } from './definition_arb';
import { VecValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../../candid_value_and_meta_arb_generator';

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
    elementCandidDefinitionArb: fc.Arbitrary<CandidDefinition> = candidDefinitionArb()
): fc.Arbitrary<CandidValueAndMeta<Vec>> {
    return CandidValueAndMetaArbGenerator(
        VecDefinitionArb(elementCandidDefinitionArb),
        VecValuesArb
    );
}
