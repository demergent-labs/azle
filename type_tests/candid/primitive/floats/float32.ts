import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { float32 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(float32);
testSerializable(float32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float32>, number>
>;
