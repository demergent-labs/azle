import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Context } from '../../types';
import { RecursiveDefinitionArb } from '../recursive/definition_arb';
import { complexCandidDefinitionMemo } from './complex_candid_definition_memo';
import { CandidDefinitionMemo, RecursiveCandidName } from './types';

// The number of options below (it's just recursive)
export const REC_ARB_COUNT = 8;

export function recursiveCandidDefinitionMemo(
    context: Context,
    parents: RecursiveCandidName[]
): CandidDefinitionMemo {
    return fc.memo((depthLevel) =>
        RecursiveDefinitionArb(
            { ...context, constraints: { depthLevel } },
            complexCandidDefinitionMemo,
            parents
        )
    );
}
