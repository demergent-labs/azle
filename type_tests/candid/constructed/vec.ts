// TODO These tests are just for one type, float32
// TODO it will take a lot of effort (not that much though) to get all types tested with Vec

import {
    float32,
    int64,
    int32,
    int16,
    int8,
    nat64,
    nat32,
    nat16,
    nat8,
    Vec,
    Record,
    text
} from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

// test float32

testCandidType(Vec(float32));
testSerializable(Vec(float32));

const testTypeMapping = Vec(float32);
export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMapping>, number[]>
>;

testCandidType(Vec(Vec(float32)));
testSerializable(Vec(Vec(float32)));

const testTypeMappingDouble = Vec(Vec(float32));
export type TestTypeMappingDouble = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingDouble>, number[][]>
>;

testCandidType(Vec(Vec(Vec(float32))));
testSerializable(Vec(Vec(Vec(float32))));

const testTypeMappingTriple = Vec(Vec(Vec(float32)));
export type TestTypeMappingTriple = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingTriple>, number[][][]>
>;

// test nat64

testCandidType(Vec(nat64));
testSerializable(Vec(nat64));

const testTypeMappingNat64 = Vec(nat64);
export type TestTypeMappingNat64 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingNat64>, BigUint64Array>
>;

// test nat32

testCandidType(Vec(nat32));
testSerializable(Vec(nat32));

const testTypeMappingNat32 = Vec(nat32);
export type TestTypeMappingNat32 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingNat32>, Uint32Array>
>;

// test nat16

testCandidType(Vec(nat16));
testSerializable(Vec(nat16));

const testTypeMappingNat16 = Vec(nat16);
export type TestTypeMappingNat16 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingNat16>, Uint16Array>
>;

// test nat8

testCandidType(Vec(nat8));
testSerializable(Vec(nat8));

const testTypeMappingNat8 = Vec(nat8);
export type TestTypeMappingNat8 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingNat8>, Uint8Array>
>;

// test int64

testCandidType(Vec(int64));
testSerializable(Vec(int64));

const testTypeMappingInt64 = Vec(int64);
export type TestTypeMappingInt64 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingInt64>, BigInt64Array>
>;

// test int32

testCandidType(Vec(int32));
testSerializable(Vec(int32));

const testTypeMappingInt32 = Vec(int32);
export type TestTypeMappingInt32 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingInt32>, Int32Array>
>;

// test int16

testCandidType(Vec(int16));
testSerializable(Vec(int16));

const testTypeMappingInt16 = Vec(int16);
export type TestTypeMappingInt16 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingInt16>, Int16Array>
>;

// test int8

testCandidType(Vec(int8));
testSerializable(Vec(int8));

const testTypeMappingInt8 = Vec(int8);
export type TestTypeMappingInt8 = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMappingInt8>, Int8Array>
>;

// test Vec<T> type

export type TestVecTypeNat64 = AssertType<
    NotAnyAndExact<Vec<nat64>, BigUint64Array>
>;

export type TestVecTypeNat32 = AssertType<
    NotAnyAndExact<Vec<nat32>, Uint32Array>
>;

export type TestVecTypeNat16 = AssertType<
    NotAnyAndExact<Vec<nat16>, Uint16Array>
>;

export type TestVecTypeNat8 = AssertType<NotAnyAndExact<Vec<nat8>, Uint8Array>>;

export type TestVecTypeInt64 = AssertType<
    NotAnyAndExact<Vec<int64>, BigInt64Array>
>;

export type TestVecTypeInt32 = AssertType<
    NotAnyAndExact<Vec<int32>, Int32Array>
>;

export type TestVecTypeInt16 = AssertType<
    NotAnyAndExact<Vec<int16>, Int16Array>
>;

export type TestVecTypeInt8 = AssertType<NotAnyAndExact<Vec<int8>, Int8Array>>;

// Crude tests to ensure Vec only accepts CandidType

const VecRecord = Record({
    id: text,
    username: text
});

Vec(float32);
Vec(int16);
Vec(VecRecord);

// @ts-expect-error
Vec({});

// @ts-expect-error
Vec(5);

// @ts-expect-error
Vec('not CandidType');

// @ts-expect-error
Vec(null);

// @ts-expect-error
Vec(undefined);

// @ts-expect-error
Vec(Symbol('not CandidType'));
