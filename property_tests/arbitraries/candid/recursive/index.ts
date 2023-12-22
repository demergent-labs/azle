import fc from 'fast-check';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import { RecursiveGlobalDefinition } from '../candid_definition_arb/types';
import { RecursiveDefinitionArb } from './definition_arb';
import { RecursiveValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { complexCandidDefinitionMemo } from '../candid_definition_arb/complex_candid_definition_memo';
import { DEFAULT_DEF_MAX_DEPTH } from '../../config';

export const recursive: {
    shapes: { [key: string]: RecursiveGlobalDefinition };
} = {
    shapes: {}
};

export type Recursive = any;

export function RecursiveArb(): fc.Arbitrary<CandidValueAndMeta<Recursive>> {
    return CandidValueAndMetaArbGenerator(
        RecursiveDefinitionArb(complexCandidDefinitionMemo, [], {
            n: DEFAULT_DEF_MAX_DEPTH
        }),
        RecursiveValuesArb
    );
}
