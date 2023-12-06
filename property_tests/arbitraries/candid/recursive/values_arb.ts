import fc from 'fast-check';
import { Recursive, recursiveShapes } from '.';
import {
    RecursiveCandidDefinition,
    RecursiveGlobalDefinition
} from '../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../candid_values_arb';

export function RecursivePlaceHolderValuesArb(
    recDefinition: RecursiveCandidDefinition | RecursiveGlobalDefinition
): fc.Arbitrary<CandidValues<Recursive>> {
    const recShape = recursiveShapes[recDefinition.name];
    return RecursiveValuesArb(recShape);
}

export function RecursiveValuesArb(
    optDefinition: RecursiveGlobalDefinition
): fc.Arbitrary<CandidValues<Recursive>> {
    return CandidValueArb(optDefinition.innerType);
}
