import fc from 'fast-check';
import { Recursive, recursive } from '.';
import {
    RecursiveCandidName,
    RecursiveCandidDefinition
} from '../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../candid_values_arb';

export function RecursiveNameValuesArb(
    recDefinition: RecursiveCandidName | RecursiveCandidDefinition,
    depthLevel: number
): fc.Arbitrary<CandidValues<Recursive>> {
    const recShape = recursive.shapes[recDefinition.name];
    return RecursiveValuesArb(recShape, depthLevel);
}

export function RecursiveValuesArb(
    recDefinition: RecursiveCandidDefinition,
    depthLevel: number
): fc.Arbitrary<CandidValues<Recursive>> {
    return CandidValueArb(recDefinition.innerType, depthLevel);
}
