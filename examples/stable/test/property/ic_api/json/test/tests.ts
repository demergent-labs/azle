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

// Type for our test cases
type TestCase = {
    name: string;
    value: unknown;
};

// Individual test cases for each special type
const testCases: TestCase[] = [
    {
        name: 'simple string',
        value: 'test string'
    },
    {
        name: 'number',
        value: 42.5
    },
    {
        name: 'boolean',
        value: true
    },
    {
        name: 'null',
        value: null
    },
    {
        name: 'NaN',
        value: NaN
    },
    {
        name: 'Infinity',
        value: Infinity
    },
    {
        name: '-Infinity',
        value: -Infinity
    },
    {
        name: '-0',
        value: -0
    },
    {
        name: 'bigint',
        value: BigInt('12345678901234567890')
    },
    {
        name: 'Principal',
        value: Principal.fromUint8Array(Uint8Array.from([1, 2, 3, 4, 5]))
    },
    {
        name: 'Int8Array',
        value: new Int8Array([1, 2, 3])
    },
    {
        name: 'Int16Array',
        value: new Int16Array([1, 2, 3])
    },
    {
        name: 'Int32Array',
        value: new Int32Array([1, 2, 3])
    },
    {
        name: 'BigInt64Array',
        value: new BigInt64Array([BigInt(1), BigInt(2), BigInt(3)])
    },
    {
        name: 'Uint8Array',
        value: new Uint8Array([1, 2, 3])
    },
    {
        name: 'Uint16Array',
        value: new Uint16Array([1, 2, 3])
    },
    {
        name: 'Uint32Array',
        value: new Uint32Array([1, 2, 3])
    },
    {
        name: 'BigUint64Array',
        value: new BigUint64Array([BigInt(1), BigInt(2), BigInt(3)])
    },
    {
        name: 'Float32Array',
        value: new Float32Array([1.1, 2.2, 3.3])
    },
    {
        name: 'Float64Array',
        value: new Float64Array([1.1, 2.2, 3.3])
    },
    {
        name: 'Map',
        value: new Map<string, string | number | boolean | null>([
            ['a', 1],
            ['b', 'string'],
            ['c', true],
            ['d', null]
        ])
    },
    {
        name: 'Set',
        value: new Set<string | number | boolean | null>([
            1,
            'string',
            true,
            null
        ])
    },
    {
        name: 'Array',
        value: [1, 'string', true, null]
    },
    {
        name: 'Object',
        value: {
            a: 1,
            b: 'string',
            c: true,
            d: null,
            e: [1, 2, 3],
            f: { nested: 'value' }
        }
    }
];

// Dictionary with 20 keys
const largeDict: Record<string, string> = {};
for (let i = 0; i < 20; i++) {
    largeDict[`key${i}`] = `value${i}`;
}
testCases.push({
    name: 'Dictionary with 20 keys',
    value: largeDict
});

// Create a simpler object that doesn't include undefined
const complexObject = {
    string: 'test',
    number: 42,
    boolean: true,
    null: null,
    nan: NaN,
    infinity: Infinity,
    negativeInfinity: -Infinity,
    negativeZero: -0,
    bigint: BigInt('12345678901234567890'),
    array: [1, 'test', true],
    object: { nested: 'value' },
    typedArray: new Uint8Array([1, 2, 3]),
    map: new Map([['key', 'value']]),
    set: new Set(['value'])
};
testCases.push({
    name: 'Complex object with multiple types',
    value: complexObject
});

// Simple object arbitraries for property testing
const simpleValueArb = fc.oneof(
    fc.string(),
    fc.integer(),
    fc.boolean(),
    fc.constant(null)
);

// Simple array and object arbitraries
const simpleArrayArb = fc.array(simpleValueArb, { maxLength: 5 });
const simpleObjectArb = fc.dictionary(fc.string(), simpleValueArb, {
    maxKeys: 5
});

// Combine them for property testing
const simpleTestArb = fc.oneof(simpleValueArb, simpleArrayArb, simpleObjectArb);

export function getTests(): Test {
    return () => {
        it('asserts json functions static and runtime types', async () => {
            const actor = await getCanisterActor<Actor>('canister');
            expect(await actor.assertTypes()).toBe(true);
        });

        it('should test each special type individually', async () => {
            const actor = await getCanisterActor<Actor>('canister');

            for (const testCase of testCases) {
                const { value } = testCase;

                // Convert the value to a JSON string using jsonStringify
                const jsonString = jsonStringify(value);

                // Call the canister methods and test both query and update
                const queryResult = await actor.processJsonQuery(jsonString);
                const updateResult = await actor.processJsonUpdate(jsonString);

                // Since we can't compare directly due to special encodings (undefined, etc.)
                // let's re-parse and re-stringify to compare the normalized versions
                const normalizedJson = jsonStringify(jsonParse(jsonString));
                const normalizedQueryResult = jsonStringify(
                    jsonParse(queryResult)
                );
                const normalizedUpdateResult = jsonStringify(
                    jsonParse(updateResult)
                );

                // The normalized strings should match
                expect(normalizedQueryResult).toEqual(normalizedJson);
                expect(normalizedUpdateResult).toEqual(normalizedJson);

                // Re-check original JSON too against the canister results
                expect(queryResult).toEqual(updateResult);
            }
        });

        it('should test simple values with property tests', async () => {
            // Use a smaller number of runs for property tests
            const executionParams = {
                ...defaultPropTestParams(),
                numRuns: 10 * Number(process.env.AZLE_PROPTEST_NUM_RUNS ?? 1)
            };

            await fc.assert(
                fc.asyncProperty(simpleTestArb, async (value) => {
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

                    // Parse the returned JSON strings and verify they match the original
                    const parsedQueryResult = jsonParse(queryResult);
                    const parsedUpdateResult = jsonParse(updateResult);

                    // Verify the objects can be re-stringified and still match
                    expect(jsonStringify(parsedQueryResult)).toEqual(
                        jsonString
                    );
                    expect(jsonStringify(parsedUpdateResult)).toEqual(
                        jsonString
                    );
                }),
                executionParams
            );
        });
    };
}
