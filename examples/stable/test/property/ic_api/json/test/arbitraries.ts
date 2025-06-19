import { Principal } from '@dfinity/principal';
import fc from 'fast-check';

/**
 * Configuration for controlling the size and complexity of generated values
 * to prevent excessive nesting and ensure reasonable test performance
 */
const RECURSIVE_LIMITS = {
    maxArrayLength: 2,
    maxObjectKeys: 3,
    maxMapEntries: 3,
    maxSetMembers: 3,
    maxKeyLength: 5
} as const;

/**
 * Arbitrary for generating Principal values from random byte arrays
 */
const principalArb = fc
    .uint8Array({
        minLength: 29,
        maxLength: 29
    })
    .map((sample) => Principal.fromUint8Array(sample));

/**
 * Arbitrary for generating BigInt values.
 *
 * TODO replace with fc.bigInt() once experimental mode no longer relies on wasmedge-quickjs
 */
const bigIntArb = process.env.AZLE_EXPERIMENTAL
    ? fc.bigInt(-1_000_000_000_000_000_000n, 1_000_000_000_000_000_000n)
    : fc.bigInt();

const bigIntExponent = process.env.AZLE_EXPERIMENTAL ? 59 : 63; // TODO remove once experimental mode no longer relies on wasmedge-quickjs

/**
 * Arbitrary for generating BigInt64 values.
 */
const bigInt64Arb = process.env.AZLE_EXPERIMENTAL
    ? fc.bigInt(
          -(2n ** BigInt(bigIntExponent)),
          2n ** BigInt(bigIntExponent) - 1n
      ) // TODO remove once experimental mode no longer relies on wasmedge-quickjs
    : fc.bigInt();

const bigUint64Exponent = process.env.AZLE_EXPERIMENTAL ? 60 : 64; // TODO remove once experimental mode no longer relies on wasmedge-quickjs

/**
 * Arbitrary for generating BigUint64 values.
 */
const bigUint64Arb = process.env.AZLE_EXPERIMENTAL
    ? fc.bigInt(0n, 2n ** BigInt(bigUint64Exponent) - 1n) // TODO remove once experimental mode no longer relies on wasmedge-quickjs
    : fc.bigInt();

/**
 * Arbitrary for generating primitive JavaScript values including special numeric values
 */
const primitiveArb = fc.oneof(
    fc.string(),
    fc.float(),
    fc.integer(),
    bigIntArb,
    fc.boolean(),
    fc.constant(null),
    fc.constant(undefined),
    fc.constant(NaN),
    fc.constant(Infinity),
    fc.constant(-Infinity),
    fc.constant(-0)
);

/**
 * Arbitrary for generating various typed array types
 */
const typedArrayArb = fc.oneof(
    fc.uint8Array(),
    fc.uint16Array(),
    fc.uint32Array(),
    fc.int8Array(),
    fc.int16Array(),
    fc.int32Array(),
    fc.float32Array(),
    fc.float64Array(),
    fc.array(bigInt64Arb).map((arr) => new BigInt64Array(arr)),
    fc.array(bigUint64Arb).map((arr) => new BigUint64Array(arr))
);

/**
 * Creates an arbitrary for arrays containing recursive values
 * @param valueArb The arbitrary to use for array elements
 * @returns An arbitrary that generates arrays with controlled size
 */
const createRecursiveArrayArb = (
    valueArb: fc.Arbitrary<any>
): fc.Arbitrary<any[]> =>
    fc.array(valueArb, { maxLength: RECURSIVE_LIMITS.maxArrayLength });

/**
 * Creates an arbitrary for objects with string keys and recursive values
 * @param valueArb The arbitrary to use for object values
 * @returns An arbitrary that generates objects with controlled complexity
 */
const createRecursiveObjectArb = (
    valueArb: fc.Arbitrary<any>
): fc.Arbitrary<Record<string, any>> =>
    fc.dictionary(
        fc.string({ maxLength: RECURSIVE_LIMITS.maxKeyLength }),
        valueArb,
        { maxKeys: RECURSIVE_LIMITS.maxObjectKeys }
    );

/**
 * Creates an arbitrary for Maps with string keys and recursive values
 * @param valueArb The arbitrary to use for map values
 * @returns An arbitrary that generates Maps with controlled size
 */
const createRecursiveMapArb = (
    valueArb: fc.Arbitrary<any>
): fc.Arbitrary<Map<string, any>> =>
    fc
        .array(
            fc.tuple(
                fc.string({ maxLength: RECURSIVE_LIMITS.maxKeyLength }),
                valueArb
            ),
            { maxLength: RECURSIVE_LIMITS.maxMapEntries }
        )
        .map((entries) => new Map(entries));

/**
 * Creates an arbitrary for Sets containing recursive values
 * @param valueArb The arbitrary to use for set members
 * @returns An arbitrary that generates Sets with controlled size
 */
const createRecursiveSetArb = (
    valueArb: fc.Arbitrary<any>
): fc.Arbitrary<Set<any>> =>
    fc
        .array(valueArb, { maxLength: RECURSIVE_LIMITS.maxSetMembers })
        .map((values) => new Set(values));

/**
 * All non-recursive (leaf) value types that can appear in the generated data structures
 */
const leafValueArb = fc.oneof(primitiveArb, typedArrayArb, principalArb);

/**
 * Recursively structured arbitrary that can generate complex nested data structures
 * including arrays, objects, Maps, and Sets with controlled depth to prevent
 * infinite recursion and ensure reasonable test performance.
 */
export const recursiveValueArb = fc.letrec((tie) => ({
    value: fc.oneof(
        // Leaf values (no further nesting)
        leafValueArb,

        // Container types that can hold recursive values
        createRecursiveArrayArb(tie('value')),
        createRecursiveObjectArb(tie('value')),
        createRecursiveMapArb(tie('value')),
        createRecursiveSetArb(tie('value'))
    )
})).value;
