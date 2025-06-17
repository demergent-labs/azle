import { Principal } from '@dfinity/principal';
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

import { _SERVICE as Actor } from './dfx_generated/canister/canister.did';

// Helper function to create a Principal arbitrary
const principalArb = fc
    .array(fc.integer({ min: 0, max: 255 }), { minLength: 1, maxLength: 29 })
    .map((bytes) => Principal.fromUint8Array(Uint8Array.from(bytes)));

// Create an arbitrary for primitive values
const primitiveArb = fc.oneof(
    fc.string({ maxLength: 5 }),
    fc.float(),
    fc.integer(),
    fc.boolean(),
    fc.constant(null),
    fc.constant(undefined),
    fc.constant(NaN),
    fc.constant(Infinity),
    fc.constant(-Infinity),
    fc.constant(-0)
);

// Create an arbitrary for typed arrays
const typedArrayArb = fc.oneof(
    fc.uint8Array({ minLength: 0, maxLength: 3 }),
    fc.uint16Array({ minLength: 0, maxLength: 3 }),
    fc.uint32Array({ minLength: 0, maxLength: 3 }),
    fc.int8Array({ minLength: 0, maxLength: 3 }),
    fc.int16Array({ minLength: 0, maxLength: 3 }),
    fc.int32Array({ minLength: 0, maxLength: 3 }),
    fc.float32Array({ minLength: 0, maxLength: 3 }),
    fc.float64Array({ minLength: 0, maxLength: 3 }),
    fc
        .array(
            fc.bigInt({
                min: -9007199254740991n,
                max: 9007199254740991n
            }),
            { minLength: 0, maxLength: 3 }
        )
        .map((arr) => new BigInt64Array(arr)),
    fc
        .array(
            fc.bigInt({
                min: 0n,
                max: 9007199254740991n
            }),
            { minLength: 0, maxLength: 3 }
        )
        .map((arr) => new BigUint64Array(arr))
);

// Special value arbitrary including Principal and BigInt
const specialArb = fc.oneof(
    principalArb,
    fc.bigInt({ min: -9007199254740991n, max: 9007199254740991n })
);

// Create recursively structured arbitraries with controlled nesting
const recursiveValueArb = fc.letrec((tie) => ({
    // Recursive value can contain any of these types
    value: fc.oneof(
        // Base values at any level
        primitiveArb,
        typedArrayArb,
        specialArb,

        // Array with recursive values - limited length
        fc.array(tie('value'), { maxLength: 2 }),

        // Object with recursive values - limited keys
        fc.dictionary(fc.string({ maxLength: 5 }), tie('value'), {
            maxKeys: 3
        }),

        // Map with recursive values - limited entries
        fc
            .array(fc.tuple(fc.string({ maxLength: 5 }), tie('value')), {
                maxLength: 3
            })
            .map((entries) => new Map(entries)),

        // Set with recursive values - limited members
        fc
            .array(tie('value'), { maxLength: 3 })
            .map((values) => new Set(values))
    )
})).value;

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
                    // Use fewer test runs to avoid timeouts
                    const executionParams = {
                        ...defaultPropTestParams(),
                        numRuns:
                            20 * Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
                    };

                    await fc.assert(
                        fc.asyncProperty(recursiveValueArb, async (value) => {
                            const actor =
                                await getCanisterActor<Actor>('canister');

                            // Convert the value to a JSON string using jsonStringify
                            const jsonString = jsonStringify(value);

                            // Call the canister method that parses and then stringifies again
                            const returnedJsonString =
                                await actor[method](jsonString);

                            // The returned string should match the original
                            expect(returnedJsonString).toEqual(jsonString);

                            // Parse the returned JSON string and directly compare with original value
                            const parsedReturnedValue =
                                jsonParse(returnedJsonString);
                            expect(parsedReturnedValue).toEqual(value);
                        }),
                        executionParams
                    );
                });
            }
        );
    };
}
