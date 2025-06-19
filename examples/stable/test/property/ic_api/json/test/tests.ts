import { describe } from '@jest/globals';
import { jsonParse, jsonStringify } from 'azle';
import {
    defaultPropTestParams,
    expect,
    getCanisterActor,
    it,
    Test
} from 'azle/_internal/test';
import fc from 'fast-check';

import { recursiveValueArb } from './arbitraries';
import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

type TestCase = {
    type: 'query' | 'update';
    method: 'processJsonQuery' | 'processJsonUpdate';
};

const testCases: TestCase[] = [
    {
        type: 'query',
        method: 'processJsonQuery'
    },
    {
        type: 'update',
        method: 'processJsonUpdate'
    }
];

export function getTests(): Test {
    return () => {
        it('asserts json functions static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes()).toBe(true);
        });

        describe.each(testCases)(
            'jsonStringify and jsonParse',
            ({ type, method }) => {
                it(`should test jsonStringify and jsonParse with ${type} method`, async () => {
                    const executionParams = {
                        ...defaultPropTestParams(),
                        numRuns:
                            20 * Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
                    };

                    await fc.assert(
                        fc.asyncProperty(recursiveValueArb, async (value) => {
                            const actor =
                                await getCanisterActor<Actor>('canister');

                            const jsonString = jsonStringify(value);

                            const returnedJsonString =
                                await actor[method](jsonString);
                            const parsedValue = jsonParse(returnedJsonString);

                            expect(returnedJsonString).toBe(jsonString);
                            expect(parsedValue).toEqual(value);
                        }),
                        executionParams
                    );
                });
            }
        );
    };
}
