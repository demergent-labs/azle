import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../config';
import { Context } from '../../types';
import { RecursiveShapes } from '../recursive';
import {
    COMPLEX_ARB_COUNT,
    complexCandidDefinitionMemo
} from './complex_candid_definition_memo';
import {
    REC_ARB_COUNT,
    recursiveCandidDefinitionMemo
} from './recursive_candid_definition_memo';
import {
    PRIM_ARB_COUNT,
    primitiveCandidDefinitionArb
} from './simple_candid_definition_arb';
import {
    CandidDefinitionArb,
    CandidDefinitionMemo,
    DefinitionConstraints,
    RecursiveCandidName
} from './types';

export function candidDefinitionArb(
    context: Context<DefinitionConstraints | undefined>,
    recursiveShapes: RecursiveShapes,
    parents: RecursiveCandidName[] = []
): CandidDefinitionArb {
    const depthLevel =
        context.constraints?.depthLevel ?? DEFAULT_DEFINITION_MAX_DEPTH;
    return candidDefinitionMemo(context, parents)(depthLevel);
}

export function candidDefinitionMemo(
    context: Context<DefinitionConstraints | undefined>,
    parents: RecursiveCandidName[]
): CandidDefinitionMemo {
    const api = context.api;
    return fc.memo((depthLevel) => {
        if (depthLevel <= 1) {
            return primitiveCandidDefinitionArb({
                ...context,
                constraints: context.constraints?.weights
            });
        }
        const constraints = context.constraints;
        return fc.oneof(
            {
                arbitrary: primitiveCandidDefinitionArb({
                    ...context,
                    constraints: constraints?.weights
                }),
                weight: PRIM_ARB_COUNT
            },
            {
                arbitrary: complexCandidDefinitionMemo(
                    { ...context, constraints: context.constraints ?? {} },
                    parents
                )(depthLevel - 1),
                weight: COMPLEX_ARB_COUNT
            },
            {
                arbitrary: recursiveCandidDefinitionMemo(
                    { api, constraints: undefined }, // TODO was it the old way to not have constraints here? Should it be?
                    parents
                )(depthLevel - 1),
                weight: REC_ARB_COUNT
            }
        );
    });
}
