import { Principal } from '@dfinity/principal';
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

// Create an arbitrary for all the special types that jsonStringify can handle
const specialValueArb = fc.oneof(
    fc.constant(undefined),
    fc.bigInt({ min: -9007199254740991n, max: 9007199254740991n }),
    principalArb,
    fc.constant(NaN),
    fc.constant(Infinity),
    fc.constant(-Infinity),
    fc.constant(-0),
    fc.uint8Array({ minLength: 0, maxLength: 10 }),
    fc.uint16Array({ minLength: 0, maxLength: 10 }),
    fc.uint32Array({ minLength: 0, maxLength: 10 }),
    fc.int8Array({ minLength: 0, maxLength: 10 }),
    fc.int16Array({ minLength: 0, maxLength: 10 }),
    fc.int32Array({ minLength: 0, maxLength: 10 }),
    fc.float32Array({ minLength: 0, maxLength: 10 }),
    fc.float64Array({ minLength: 0, maxLength: 10 })
);

// Create safe BigInt array arbitraries with appropriate ranges
const bigInt64ArrayArb = fc
    .array(fc.bigInt({ min: -9007199254740991n, max: 9007199254740991n }), {
        minLength: 0,
        maxLength: 5
    })
    .map((arr) => new BigInt64Array(arr));

const bigUint64ArrayArb = fc
    .array(fc.bigInt({ min: 0n, max: 9007199254740991n }), {
        minLength: 0,
        maxLength: 5
    })
    .map((arr) => new BigUint64Array(arr));

// Create an arbitrary for JSON-compatible values (strings, numbers, booleans, arrays, objects)
const simpleValueArb = fc.oneof(
    fc.string(),
    fc.float(),
    fc.integer(),
    fc.boolean(),
    fc.constant(null)
);

const simpleArrayArb = fc.array(simpleValueArb, { maxLength: 3 });
const simpleObjectArb = fc.dictionary(fc.string(), simpleValueArb, {
    maxKeys: 5
});

// Create a map with simple key/value pairs
const mapArb = fc
    .array(fc.tuple(fc.string(), simpleValueArb), { maxLength: 5 })
    .map((entries) => new Map(entries));

// Create a set with simple values
const setArb = fc
    .array(simpleValueArb, { maxLength: 5 })
    .map((items) => new Set(items));

// Combine everything to create mixed objects without excessive nesting
const mixedObjectArb = fc.oneof(
    specialValueArb,
    simpleValueArb,
    simpleArrayArb,
    simpleObjectArb,
    bigInt64ArrayArb,
    bigUint64ArrayArb,
    mapArb,
    setArb,
    fc.dictionary(fc.string(), simpleValueArb, { maxKeys: 20 })
);

export function getTests(): Test {
    return () => {
        it('asserts json functions static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes()).toBe(true);
        });

        it('should test jsonStringify and jsonParse with query method', async () => {
            // Multiply the default number of runs by 100 as requested in the issue
            const executionParams = {
                ...defaultPropTestParams(),
                numRuns: 100 * Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
            };

            await fc.assert(
                fc.asyncProperty(mixedObjectArb, async (value) => {
                    const actor = await getCanisterActor<Actor>('canister');

                    // Convert the value to a JSON string using jsonStringify
                    const jsonString = jsonStringify(value);

                    // Call the canister method that parses and then stringifies again
                    const returnedJsonString =
                        await actor.processJsonQuery(jsonString);

                    // The returned string should match the original
                    expect(returnedJsonString).toEqual(jsonString);

                    // Parse the returned JSON string and verify it matches the original
                    const parsedReturnedValue = jsonParse(returnedJsonString);
                    expect(jsonStringify(parsedReturnedValue)).toEqual(
                        jsonString
                    );
                }),
                executionParams
            );
        });

        it('should test jsonStringify and jsonParse with update method', async () => {
            // Multiply the default number of runs by 100 as requested in the issue
            const executionParams = {
                ...defaultPropTestParams(),
                numRuns: 100 * Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
            };

            await fc.assert(
                fc.asyncProperty(mixedObjectArb, async (value) => {
                    const actor = await getCanisterActor<Actor>('canister');

                    // Convert the value to a JSON string using jsonStringify
                    const jsonString = jsonStringify(value);

                    // Call the canister method that parses and then stringifies again
                    const returnedJsonString =
                        await actor.processJsonUpdate(jsonString);

                    // The returned string should match the original
                    expect(returnedJsonString).toEqual(jsonString);

                    // Parse the returned JSON string and verify it matches the original
                    const parsedReturnedValue = jsonParse(returnedJsonString);
                    expect(jsonStringify(parsedReturnedValue)).toEqual(
                        jsonString
                    );
                }),
                executionParams
            );
        });
    };
}
