import fc from 'fast-check';
import { Recursive, RecursiveShapes } from '.';
import {
    RecursiveCandidName,
    RecursiveCandidDefinition
} from '../candid_definition_arb/types';
import {
    CandidValues,
    CandidValueArb,
    CandidValueConstraints
} from '../candid_values_arb';
import { DEFAULT_VALUE_MAX_DEPTH } from '../../config';

export function RecursiveNameValuesArb(
    recDefinition: RecursiveCandidName | RecursiveCandidDefinition,
    recursiveShapes: RecursiveShapes,
    constraints: CandidValueConstraints
): fc.Arbitrary<CandidValues<Recursive>> {
    const recShape = recursiveShapes[recDefinition.name];
    return RecursiveValuesArb(recShape, recursiveShapes, constraints);
}

export function RecursiveValuesArb(
    recDefinition: RecursiveCandidDefinition,
    recursiveShapes: RecursiveShapes,
    constraints: CandidValueConstraints = {
        depthLevel: DEFAULT_VALUE_MAX_DEPTH
    }
): fc.Arbitrary<CandidValues<Recursive>> {
    return CandidValueArb(
        recDefinition.innerType,
        recursiveShapes,
        constraints
    );
}
