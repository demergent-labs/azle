import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int32 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(int32);
testSerializable(int32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int32>, number>
>;
