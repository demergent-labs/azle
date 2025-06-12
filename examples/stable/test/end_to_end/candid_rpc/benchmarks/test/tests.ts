import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { please, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/benchmarks/benchmarks.did';

const iterations = [1, 10, 100, 1_000, 10_000, 100_000, 1_000_000];
const methodNames = ['blobInitStack', 'blobInitHeap'] as const;

const testCases = methodNames.flatMap((methodName) =>
    iterations.map((iterationCount) => [methodName, iterationCount] as const)
);

export function getTests(actor: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe.each(testCases)('%s benchmarks', (methodName, iterations) => {
            please(
                `benchmark with ${iterations} iteration${iterations === 1 ? '' : 's'}`,
                async () => {
                    await actor[methodName](iterations);
                }
            );
        });
    };
}
