import fc from 'fast-check';
import { RecursiveDefinitionArb } from '../recursive/definition_arb';
import { complexCandidDefinitionMemo } from './complex_candid_definition_memo';
import { RecursiveCandidDefinition, CandidDefinitionMemo } from './types';

// The number of options below (it's just recursive)
export const REC_ARB_COUNT = 1;

export function recursiveCandidDefinitionMemo(
    parents: RecursiveCandidDefinition[]
): CandidDefinitionMemo {
    return fc.memo((n) =>
        RecursiveDefinitionArb(complexCandidDefinitionMemo, parents, n)
    );
}
