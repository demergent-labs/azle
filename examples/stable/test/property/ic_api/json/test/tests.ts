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

// Create very simple object keys - avoid special characters
const simpleKeyArb = fc.constant('key');

// Create basic primitives arbitrary
const primitiveArb = fc.oneof(
    fc.constant('simple_string'),
    fc.constant(42),
    fc.constant(true),
    fc.constant(false),
    fc.constant(null)
);

// Test special values individually
const testNaN = { value: NaN };
const testInfinity = { value: Infinity };
const testNegativeInfinity = { value: -Infinity };
const testNegativeZero = { value: -0 };
const testBigInt = { value: BigInt(42) };
const testInt8Array = { value: new Int8Array([1, 2, 3]) };
const testInt16Array = { value: new Int16Array([1, 2, 3]) };
const testInt32Array = { value: new Int32Array([1, 2, 3]) };
const testUint8Array = { value: new Uint8Array([1, 2, 3]) };
const testUint16Array = { value: new Uint16Array([1, 2, 3]) };
const testUint32Array = { value: new Uint32Array([1, 2, 3]) };
const testBigInt64Array = { value: BigInt64Array.from([1n, 2n, 3n]) };
const testBigUint64Array = { value: BigUint64Array.from([1n, 2n, 3n]) };
const testFloat32Array = { value: new Float32Array([1.1, 2.2, 3.3]) };
const testFloat64Array = { value: new Float64Array([1.1, 2.2, 3.3]) };
const testMap = {
    value: new Map([
        ['a', 1],
        ['b', 2]
    ])
};
const testSet = { value: new Set(['a', 'b', 'c']) };
const testPrincipal = {
    value: Principal.fromUint8Array(new Uint8Array([1, 2, 3, 4, 5]))
};

// Simple object with primitives only
const simpleObjectArb = fc.record({
    a: primitiveArb,
    b: primitiveArb,
    c: primitiveArb
});

// Create a dictionary with primitives only
const simpleDictArb = fc.dictionary(simpleKeyArb, primitiveArb, { maxKeys: 3 });

// A list of test cases with a readable description
const testCases = [
    { description: 'NaN', value: testNaN },
    { description: 'Infinity', value: testInfinity },
    { description: 'NegativeInfinity', value: testNegativeInfinity },
    { description: 'NegativeZero', value: testNegativeZero },
    { description: 'BigInt', value: testBigInt },
    { description: 'Int8Array', value: testInt8Array },
    { description: 'Int16Array', value: testInt16Array },
    { description: 'Int32Array', value: testInt32Array },
    { description: 'Uint8Array', value: testUint8Array },
    { description: 'Uint16Array', value: testUint16Array },
    { description: 'Uint32Array', value: testUint32Array },
    { description: 'BigInt64Array', value: testBigInt64Array },
    { description: 'BigUint64Array', value: testBigUint64Array },
    { description: 'Float32Array', value: testFloat32Array },
    { description: 'Float64Array', value: testFloat64Array },
    { description: 'Map', value: testMap },
    { description: 'Set', value: testSet },
    { description: 'Principal', value: testPrincipal }
];

// Create a small mixed object (avoiding type errors)
const mixedObjectArb = fc.oneof(primitiveArb, simpleObjectArb, simpleDictArb);

export function getTests(): Test {
    return () => {
        it('asserts json functions static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes()).toBe(true);
        });

        it('should test each special type individually', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (const testCase of testCases) {
                // Use the value from the test case
                const { value } = testCase;

                // Convert the value to a JSON string using jsonStringify
                const jsonString = jsonStringify(value);

                // Call the canister method that parses and then stringifies again
                const returnedJsonString =
                    await actor.processJsonQuery(jsonString);

                // The returned string should match the original
                expect(returnedJsonString).toEqual(jsonString);

                // Also parse the returned string to verify object equivalence
                const parsedObject = jsonParse(returnedJsonString);
                const reparsedJsonString = jsonStringify(parsedObject);
                expect(reparsedJsonString).toEqual(jsonString);
            }
        });

        it('should test primitive values with property tests', async () => {
            // Use a smaller number of runs to ensure tests complete
            const executionParams = {
                ...defaultPropTestParams(),
                numRuns: 10 * Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
            };

            await fc.assert(
                fc.asyncProperty(mixedObjectArb, async (value) => {
                    const actor = await getCanisterActor<Actor>('canister');

                    // Convert the value to a JSON string using jsonStringify
                    const jsonString = jsonStringify(value);

                    // Call the canister methods and test both query and update
                    const queryResult =
                        await actor.processJsonQuery(jsonString);
                    const updateResult =
                        await actor.processJsonUpdate(jsonString);

                    // The returned strings should match the original
                    expect(queryResult).toEqual(jsonString);
                    expect(updateResult).toEqual(jsonString);

                    // Also parse the returned strings
                    const queryObject = jsonParse(queryResult);
                    const updateObject = jsonParse(updateResult);

                    // Re-stringify and compare
                    expect(jsonStringify(queryObject)).toEqual(jsonString);
                    expect(jsonStringify(updateObject)).toEqual(jsonString);
                }),
                executionParams
            );
        });
    };
}
