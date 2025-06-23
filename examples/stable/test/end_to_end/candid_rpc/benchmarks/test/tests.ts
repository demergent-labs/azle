import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
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
    iterations.map((iterationCount) => [methodName, iterationCount] as const)
);

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe.each(testCases)('%s benchmarks', (methodName, iterations) => {
            const pleaseMethod =
                shouldSkip(methodName, iterations) === true
                    ? please.skip
                    : please;

            pleaseMethod(
                `benchmark with ${iterations} iteration${iterations === 1 ? '' : 's'}`,
                async () => {
                    await actor[methodName](iterations);
                }
            );
        });

        please('clear all heap storage', async () => {
            await actor.blobClearHeapStorage();
            await actor.boolClearHeapStorage();
            await actor.float32ClearHeapStorage();
            await actor.float64ClearHeapStorage();
            await actor.int16ClearHeapStorage();
            await actor.int32ClearHeapStorage();
            await actor.int64ClearHeapStorage();
            await actor.int8ClearHeapStorage();
            await actor.intClearHeapStorage();
            await actor.nat16ClearHeapStorage();
            await actor.nat32ClearHeapStorage();
            await actor.nat64ClearHeapStorage();
            await actor.nat8ClearHeapStorage();
            await actor.natClearHeapStorage();
            await actor.nullClearHeapStorage();
            await actor.optClearHeapStorage();
            await actor.principalClearHeapStorage();
            await actor.recordClearHeapStorage();
            await actor.textClearHeapStorage();
            await actor.variantClearHeapStorage();
            await actor.vecClearHeapStorage();
        });
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
