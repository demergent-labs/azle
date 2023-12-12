import fc from 'fast-check';
import { Recursive, recursive } from '.';
import {
    RecursiveCandidDefinition,
    RecursiveGlobalDefinition
} from '../candid_definition_arb/types';
import { CandidValues, CandidValueArb } from '../candid_values_arb';

export function RecursivePlaceHolderValuesArb(
    recDefinition: RecursiveCandidDefinition | RecursiveGlobalDefinition,
    n: number
): fc.Arbitrary<CandidValues<Recursive>> {
    const recShape = recursive.shapes[recDefinition.name];
    return RecursiveValuesArb(recShape, n);
}

export function RecursiveValuesArb(
    recDefinition: RecursiveGlobalDefinition,
    n: number
): fc.Arbitrary<CandidValues<Recursive>> {
    return CandidValueArb(recDefinition.innerType, n);
}
