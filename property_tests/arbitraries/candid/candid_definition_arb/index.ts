import fc from 'fast-check';
import {
    CandidDefinitionArb,
    RecursiveCandidDefinition,
    CandidDefinitionMemo,
    CandidDefinitionWeights
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
import { DEFAULT_DEF_MAX_DEPTH } from '../../config';

export function candidDefinitionArb(
    maxDepth: number = DEFAULT_DEF_MAX_DEPTH,
    parents: RecursiveCandidDefinition[] = [],
    weights: CandidDefinitionWeights = {}
): CandidDefinitionArb {
    return candidDefinitionMemo(parents, weights)(maxDepth);
}

export function candidDefinitionMemo(
    parents: RecursiveCandidDefinition[],
    weights: CandidDefinitionWeights = {}
): CandidDefinitionMemo {
    return fc.memo((n) => {
        if (n <= 1) {
            return primitiveCandidDefinitionArb();
        }
        return fc.oneof(
            {
                arbitrary: primitiveCandidDefinitionArb(weights),
                weight: PRIM_ARB_COUNT
            },
            {
                arbitrary: complexCandidDefinitionMemo(parents, weights)(n - 1),
                weight: COMPLEX_ARB_COUNT
            },
            {
                arbitrary: recursiveCandidDefinitionMemo(parents)(n - 1),
                weight: REC_ARB_COUNT
            }
        );
    });
}
