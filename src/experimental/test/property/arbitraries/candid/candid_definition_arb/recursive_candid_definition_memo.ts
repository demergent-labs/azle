import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { Context } from '../../types';
import { RecursiveDefinitionArb } from '../recursive/definition_arb';
import { complexCandidDefinitionMemo } from './complex_candid_definition_memo';
import { CandidDefinitionMemo, RecursiveCandidName } from './types';

// TODO enable the recursive test below by replacing 0 with 8 once https://github.com/demergent-labs/azle/issues/1526 is resolved
// The number of options below (it's just recursive)
export const REC_ARB_COUNT = 0;

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
