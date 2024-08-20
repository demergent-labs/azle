import fc from 'fast-check';

import { DEFAULT_DEFINITION_MAX_DEPTH } from '../../config';
import { Api } from '../../types';
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
    api: Api,
    constraints: DefinitionConstraints = {}
): CandidDefinitionArb {
    return candidDefinitionMemo(
        parents,
        api,
        constraints
    )(constraints.depthLevel ?? DEFAULT_DEFINITION_MAX_DEPTH);
}

export function candidDefinitionMemo(
    parents: RecursiveCandidName[],
    api: Api,
    constraints: DefinitionConstraints = {}
): CandidDefinitionMemo {
    return fc.memo((depthLevel) => {
        if (depthLevel <= 1) {
            return primitiveCandidDefinitionArb(api);
        }
        return fc.oneof(
            {
                arbitrary: primitiveCandidDefinitionArb(
                    api,
                    constraints.weights
                ),
                weight: PRIM_ARB_COUNT
            },
            {
                arbitrary: complexCandidDefinitionMemo(
                    parents,
                    api,
                    constraints
                )(depthLevel - 1),
                weight: COMPLEX_ARB_COUNT
            },
            {
                arbitrary: recursiveCandidDefinitionMemo(
                    parents,
                    api
                )(depthLevel - 1),
                weight: REC_ARB_COUNT
            }
        );
    });
}
