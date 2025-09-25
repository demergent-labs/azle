import { ActorSubclass } from '@icp-sdk/core/agent';
import { please, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/benchmarks/benchmarks.did';

const iterations = [1, 10, 100, 1_000, 10_000, 100_000, 1_000_000];
const methodNames = [
    'blobInitStack',
    'blobInitHeap',
    'boolInitStack',
    'boolInitHeap',
    'float32InitStack',
    'float32InitHeap',
    'float64InitStack',
    'float64InitHeap',
    'intInitStack',
    'intInitHeap',
    'int8InitStack',
    'int8InitHeap',
    'int16InitStack',
    'int16InitHeap',
    'int32InitStack',
    'int32InitHeap',
    'int64InitStack',
    'int64InitHeap',
    'natInitStack',
    'natInitHeap',
    'nat8InitStack',
    'nat8InitHeap',
    'nat16InitStack',
    'nat16InitHeap',
    'nat32InitStack',
    'nat32InitHeap',
    'nat64InitStack',
    'nat64InitHeap',
    'nullInitStack',
    'nullInitHeap',
    'optInitStack',
    'optInitHeap',
    'principalInitStack',
    'principalInitHeap',
    'recordInitStack',
    'recordInitHeap',
    'textInitStack',
    'textInitHeap',
    'variantInitStack',
    'variantInitHeap',
    'vecInitStack',
    'vecInitHeap'
] as const;

const testCases = methodNames.flatMap((methodName) =>
    iterations.map((iterations) => [methodName, iterations] as const)
);

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        for (const [methodName, iterations] of testCases) {
            const pleaseMethod =
                shouldSkip(methodName, iterations) === true
                    ? please.skip
                    : please;

            pleaseMethod(
                `benchmark ${methodName} with ${iterations} iteration${iterations === 1 ? '' : 's'}`,
                async () => {
                    await actor[methodName](iterations);
                }
            );
        }
    };
}

function shouldSkip(methodName: string, iterations: number): boolean {
    // These were hitting the instruction limit
    if (
        methodName === 'principalInitStack' ||
        methodName === 'principalInitHeap' ||
        methodName === 'recordInitStack' ||
        methodName === 'recordInitHeap'
    ) {
        if (iterations >= 100_000) {
            return true;
        }
    }

    return false;
}
