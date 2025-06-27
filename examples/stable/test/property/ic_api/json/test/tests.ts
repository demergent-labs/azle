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
    if (process.env.AZLE_EXPERIMENTAL === 'true') {
        return () => {
            // TODO once we unify the stable mode and experimental mode binaries
            // TODO and thus completely remove wasmedge-quickjs, then we should
            // TODO run these tests again in experimental mode. We did not want to
            // TODO deal with the 64-bit number corruption issue in the old version of QuickJS
            // TODO that is still used in our version of wasmedge-quickjs
            it.skip(`does not run these tests on experimental`, () => {});
        };
    } else {
        return () => {
            it('asserts json functions static and runtime types', async () => {
                const actor = await getCanisterActor<Actor>('canister');
                expect(await actor.assertTypes()).toBe(true);
            });

            it.each(testCases)(
                'should test jsonStringify and jsonParse with $type method',
                async ({ method }) => {
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
                }
            );
        };
    }
}
