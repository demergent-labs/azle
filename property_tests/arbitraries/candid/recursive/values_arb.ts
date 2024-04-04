import fc from 'fast-check';

import { DEFAULT_VALUE_MAX_DEPTH } from '../../config';
import {
    RecursiveCandidDefinition,
    RecursiveCandidName
} from '../candid_definition_arb/types';
import {
    CandidValueArb,
    CandidValueConstraints,
    CandidValues
} from '../candid_values_arb';
import { Recursive, RecursiveShapes } from '.';

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
