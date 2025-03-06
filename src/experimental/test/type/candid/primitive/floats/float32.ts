import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { float32 } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(float32);
testSerializable(float32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float32>, number>
>;
