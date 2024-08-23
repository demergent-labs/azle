import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../config';
import { Context } from '../../types';
import { complexCandidDefinitionMemo } from '../candid_definition_arb/complex_candid_definition_memo';
import { RecursiveCandidDefinition } from '../candid_definition_arb/types';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { RecursiveDefinitionArb } from './definition_arb';
import { RecursiveValuesArb } from './values_arb';

export type Recursive = any;
export type RecursiveShapes = { [key: string]: RecursiveCandidDefinition };

export function RecursiveArb(
    context: Context
): fc.Arbitrary<CandidValueAndMeta<Recursive>> {
    return CandidValueAndMetaArbGenerator(
        context,
        RecursiveDefinitionArb(
            {
                ...context,
                constraints: {
                    depthLevel: DEFAULT_DEFINITION_MAX_DEPTH,
                    forceInline: true
                }
            },
            complexCandidDefinitionMemo,
            []
        ),
        RecursiveValuesArb
    );
}
