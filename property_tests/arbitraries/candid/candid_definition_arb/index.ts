import fc from 'fast-check';
import {
    CandidDefinitionArb,
    RecursiveCandidName,
    CandidDefinitionMemo,
    DefinitionConstraints
} from './types';
import {
    COMPLEX_ARB_COUNT,
    complexCandidDefinitionMemo
} from './complex_candid_definition_memo';
import {
    PRIM_ARB_COUNT,
    primitiveCandidDefinitionArb
} from './simple_candid_definition_arb';
import {
    REC_ARB_COUNT,
    recursiveCandidDefinitionMemo
} from './recursive_candid_definition_memo';
import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../config';
import { RecursiveShapes } from '../recursive';

export function candidDefinitionArb(
    recursiveShapes: RecursiveShapes,
    parents: RecursiveCandidName[] = [],
    constraints: DefinitionConstraints = {}
): CandidDefinitionArb {
    return candidDefinitionMemo(
        parents,
        constraints
    )(constraints.depthLevel ?? DEFAULT_DEFINITION_MAX_DEPTH);
}

export function candidDefinitionMemo(
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints = {}
): CandidDefinitionMemo {
    return fc.memo((depthLevel) => {
        if (depthLevel <= 1) {
            return primitiveCandidDefinitionArb();
        }
        return fc.oneof(
            {
                arbitrary: primitiveCandidDefinitionArb(constraints.weights),
                weight: PRIM_ARB_COUNT
            },
            {
                arbitrary: complexCandidDefinitionMemo(
                    parents,
                    constraints
                )(depthLevel - 1),
                weight: COMPLEX_ARB_COUNT
            },
            {
                arbitrary: recursiveCandidDefinitionMemo(parents)(
                    depthLevel - 1
                ),
                weight: REC_ARB_COUNT
            }
        );
    });
}
