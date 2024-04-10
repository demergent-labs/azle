import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../config';
import { complexCandidDefinitionMemo } from '../candid_definition_arb/complex_candid_definition_memo';
import { RecursiveCandidDefinition } from '../candid_definition_arb/types';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { RecursiveDefinitionArb } from './definition_arb';
import { RecursiveValuesArb } from './values_arb';

export type Recursive = any;
export type RecursiveShapes = { [key: string]: RecursiveCandidDefinition };

export function RecursiveArb(): fc.Arbitrary<CandidValueAndMeta<Recursive>> {
    return CandidValueAndMetaArbGenerator(
        RecursiveDefinitionArb(complexCandidDefinitionMemo, [], {
            depthLevel: DEFAULT_DEFINITION_MAX_DEPTH
        }),
        RecursiveValuesArb
    );
}
