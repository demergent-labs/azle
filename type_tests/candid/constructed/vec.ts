// TODO These tests are just for one type, float32
// TODO it will take a lot of effort (not that much though) to get all types tested with Vec

import { float32, Vec } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

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
