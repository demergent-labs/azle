import fc from 'fast-check';

import { DEFAULT_VALUE_MAX_DEPTH } from '../../config';
import { Context } from '../../types';
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
    context: Context<CandidValueConstraints>,
    recDefinition: RecursiveCandidName | RecursiveCandidDefinition,
    recursiveShapes: RecursiveShapes
): fc.Arbitrary<CandidValues<Recursive>> {
    const recShape = recursiveShapes[recDefinition.name];
    return RecursiveValuesArb(context, recShape, recursiveShapes);
}

export function RecursiveValuesArb(
    context: Context<CandidValueConstraints>,
    recDefinition: RecursiveCandidDefinition,
    recursiveShapes: RecursiveShapes
): fc.Arbitrary<CandidValues<Recursive>> {
    const constraints = context.constraints ?? {
        depthLevel: DEFAULT_VALUE_MAX_DEPTH
    };
    return CandidValueArb(
        {
            ...context,
            constraints
        },
        recDefinition.innerType,
        recursiveShapes
    );
}
