import fc from 'fast-check';
import { Recursive, RecursiveShapes } from '.';
import {
    RecursiveCandidName,
    RecursiveCandidDefinition
} from '../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../candid_values_arb';

export function RecursiveNameValuesArb(
    recDefinition: RecursiveCandidName | RecursiveCandidDefinition,
    recursiveShapes: RecursiveShapes,
    depthLevel: number
): fc.Arbitrary<CandidValues<Recursive>> {
    const recShape = recursiveShapes[recDefinition.name];
    return RecursiveValuesArb(recShape, recursiveShapes, depthLevel);
}

export function RecursiveValuesArb(
    recDefinition: RecursiveCandidDefinition,
    recursiveShapes: RecursiveShapes,
    depthLevel: number
): fc.Arbitrary<CandidValues<Recursive>> {
    return CandidValueArb(recDefinition.innerType, recursiveShapes, depthLevel);
}
