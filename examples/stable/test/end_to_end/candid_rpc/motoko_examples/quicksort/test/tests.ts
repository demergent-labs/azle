import { ActorSubclass } from '@icp-sdk/core/agent';
import { expect, it, Test } from 'azle/_internal/test';

import { _SERVICE } from './dfx_generated/quicksort/quicksort.did';

export function getTests(quicksortCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        const testCases = [
            {
                input: [5n, 3n, 0n, 9n, 8n, 2n, 1n, 4n, 7n, 6n],
                expected: [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n],
                description: 'values from the motoko repo'
            },
            {
                input: [],
                expected: [],
                description: 'an empty array'
            },
            {
                input: [1n],
                expected: [1n],
                description: 'only one int'
            },
            {
                input: [1n, -3n, -1n, 0n, -2n, 2n, 3n],
                expected: [-3n, -2n, -1n, 0n, 1n, 2n, 3n],
                description: 'negative numbers'
            }
        ];

        it.each(testCases)(
            'sorts with $description',
            async ({ input, expected }) => {
                const result = await quicksortCanister.sort(input);

                expect(result).toStrictEqual(expected);
            }
        );
    };
}
