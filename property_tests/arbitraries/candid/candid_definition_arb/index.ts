import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../config';
import { Syntax } from '../../types';
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
    recursiveShapes: RecursiveShapes,
    parents: RecursiveCandidName[] = [],
    syntax: Syntax,
    constraints: DefinitionConstraints = {}
): CandidDefinitionArb {
    return candidDefinitionMemo(
        parents,
        syntax,
        constraints
    )(constraints.depthLevel ?? DEFAULT_DEFINITION_MAX_DEPTH);
}

export function candidDefinitionMemo(
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints = {}
): CandidDefinitionMemo {
    return fc.memo((depthLevel) => {
        if (depthLevel <= 1) {
            return primitiveCandidDefinitionArb(syntax);
        }
        return fc.oneof(
            {
                arbitrary: primitiveCandidDefinitionArb(
                    syntax,
                    constraints.weights
                ),
                weight: PRIM_ARB_COUNT
            },
            {
                arbitrary: complexCandidDefinitionMemo(
                    parents,
                    syntax,
                    constraints
                )(depthLevel - 1),
                weight: COMPLEX_ARB_COUNT
            },
            {
                arbitrary: recursiveCandidDefinitionMemo(
                    parents,
                    syntax
                )(depthLevel - 1),
                weight: REC_ARB_COUNT
            }
        );
    });
}
