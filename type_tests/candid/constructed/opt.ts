// TODO These tests are just for one type, float32
// TODO it will take a lot of effort (not that much though) to get all types tested with Vec

import { float32, Opt, RequireExactlyOne } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(Opt(float32));
testSerializable(Opt(float32));

const testTypeMapping = Opt(float32);
export type TestTypeMapping = AssertType<
    NotAnyAndExact<
        TypeMapping<typeof testTypeMapping>,
        RequireExactlyOne<{ Some: number; None: null }>
    >
>;

testCandidType(Opt(Opt(float32)));
testSerializable(Opt(Opt(float32)));

const testTypeMappingDouble = Opt(Opt(float32));
export type TestTypeMappingDouble = AssertType<
    NotAnyAndExact<
        TypeMapping<typeof testTypeMappingDouble>,
        RequireExactlyOne<{
            Some: RequireExactlyOne<{ Some: number; None: null }>;
            None: null;
        }>
    >
>;

testCandidType(Opt(Opt(Opt(float32))));
testSerializable(Opt(Opt(Opt(float32))));

const testTypeMappingTriple = Opt(Opt(Opt(float32)));
export type TestTypeMappingTriple = AssertType<
    NotAnyAndExact<
        TypeMapping<typeof testTypeMappingTriple>,
        RequireExactlyOne<{
            Some: RequireExactlyOne<{
                Some: RequireExactlyOne<{ Some: number; None: null }>;
                None: null;
            }>;
            None: null;
        }>
    >
>;
