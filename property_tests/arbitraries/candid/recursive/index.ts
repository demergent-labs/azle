import fc from 'fast-check';
import { CandidValueAndMeta } from '../candid_value_and_meta_arb';
import {
    CandidDefinitionArb,
    RecursiveCandidDefinition,
    RecursiveGlobalDefinition
} from '../candid_definition_arb/types';
import { RecursiveDefinitionArb } from './definition_arb';
import { RecursiveValuesArb } from './values_arb';
import { CandidValueAndMetaArbGenerator } from '../candid_value_and_meta_arb_generator';
import { candidDefinitionArb } from '../candid_definition_arb';

export const recursiveShapes: { [key: string]: RecursiveGlobalDefinition } = {};
export const recursiveOptions: RecursiveCandidDefinition[] = [];

export type Recursive = any;

export function RecursiveArb(
    arb: CandidDefinitionArb = candidDefinitionArb()
): fc.Arbitrary<CandidValueAndMeta<Recursive>> {
    return CandidValueAndMetaArbGenerator(
        RecursiveDefinitionArb(arb),
        RecursiveValuesArb
    );
}
