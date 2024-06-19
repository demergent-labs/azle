import { ActorSubclass } from '@dfinity/agent';
import { describe } from '@jest/globals';
import { expect, it, Test } from 'azle/test/jest';

// @ts-ignore
import { _SERVICE } from './dfx_generated/quicksort/quicksort.did';

export function getTests(quicksortCanister: ActorSubclass<_SERVICE>): Test {
    return () => {
        describe.each([
            [
                [5n, 3n, 0n, 9n, 8n, 2n, 1n, 4n, 7n, 6n],
                [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n],
                'values from the motoko repo'
            ],
            [[], [], 'an empty array'],
            [[1n], [1n], 'only one int'],
            [
                [1n, -3n, -1n, 0n, -2n, 2n, 3n],
                [-3n, -2n, -1n, 0n, 1n, 2n, 3n],
                'negative numbers'
            ]
        ])('standard simple quick sorts', (input, expected, description) => {
            it(`sorts with ${description}`, async () => {
                const result = await quicksortCanister.sort(input);

                expect(result).toStrictEqual(expected);
            });
        });
    };
}
