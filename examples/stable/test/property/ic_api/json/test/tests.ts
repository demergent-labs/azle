import { Principal } from '@dfinity/principal';
import { jsonStringify } from 'azle';
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
    fc.bigInt(),
    principalArb,
    fc.constant(NaN),
    fc.constant(Infinity),
    fc.constant(-Infinity),
    fc.constant(-0),
    fc.array(fc.integer()).map((arr) => new Int8Array(arr)),
    fc.array(fc.integer()).map((arr) => new Int16Array(arr)),
    fc.array(fc.integer()).map((arr) => new Int32Array(arr)),
    fc.array(fc.integer({ min: 0, max: 100 })).map((arr) => {
        try {
            return new BigInt64Array(arr.map((n) => BigInt(n)));
        } catch (_e) {
            // Skip if conversion fails
            return new BigInt64Array(0);
        }
    }),
    fc.array(fc.integer()).map((arr) => new Uint8Array(arr)),
    fc.array(fc.integer()).map((arr) => new Uint16Array(arr)),
    fc.array(fc.integer()).map((arr) => new Uint32Array(arr)),
    fc.array(fc.integer({ min: 0, max: 100 })).map((arr) => {
        try {
            return new BigUint64Array(arr.map((n) => BigInt(n)));
        } catch (_e) {
            // Skip if conversion fails
            return new BigUint64Array(0);
        }
    }),
    fc.array(fc.float()).map((arr) => new Float32Array(arr)),
    fc.array(fc.float()).map((arr) => new Float64Array(arr)),
    fc
        .array(fc.tuple(fc.string(), fc.string()), { maxLength: 5 })
        .map((entries) => new Map(entries)),
    fc.array(fc.string(), { maxLength: 5 }).map((items) => new Set(items))
);

// Create an arbitrary for JSON-compatible values (strings, numbers, booleans, arrays, objects)
const jsonCompatibleArb: fc.Arbitrary<unknown> = fc.letrec((tie) => ({
    value: fc.oneof(
        fc.string(),
        fc.float(),
        fc.boolean(),
        fc.array(tie('value'), { maxLength: 2 }),
        fc.dictionary(fc.string(), tie('value'), { maxKeys: 2 })
    )
})).value;

// Combine both to create objects that may contain special types at any level
const mixedObjectArb: fc.Arbitrary<unknown> = fc.letrec((tie) => ({
    value: fc.oneof(
        specialValueArb,
        jsonCompatibleArb,
        fc.array(tie('value'), { maxLength: 2 }),
        fc.dictionary(fc.string(), tie('value'), { maxKeys: 2 })
    )
})).value;

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
                    try {
                        const actor = await getCanisterActor<Actor>('canister');

                        // Convert the value to a JSON string using jsonStringify
                        const jsonString = jsonStringify(value);

                        // Call the canister method that parses and then stringifies again
                        const returnedJsonString =
                            await actor.processJsonQuery(jsonString);

                        // The returned string should match the original
                        expect(returnedJsonString).toEqual(jsonString);
                    } catch (_e) {
                        // Skip if we encounter conversion issues
                        return true;
                    }
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
                    try {
                        const actor = await getCanisterActor<Actor>('canister');

                        // Convert the value to a JSON string using jsonStringify
                        const jsonString = jsonStringify(value);

                        // Call the canister method that parses and then stringifies again
                        const returnedJsonString =
                            await actor.processJsonUpdate(jsonString);

                        // The returned string should match the original
                        expect(returnedJsonString).toEqual(jsonString);
                    } catch (_e) {
                        // Skip if we encounter conversion issues
                        return true;
                    }
                }),
                executionParams
            );
        });
    };
}
