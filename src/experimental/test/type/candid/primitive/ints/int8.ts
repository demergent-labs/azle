import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int8 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(int8);
testSerializable(int8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int8>, number>
>;
