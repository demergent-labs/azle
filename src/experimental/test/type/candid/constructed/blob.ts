import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { blob } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';

testCandidType(blob);
testSerializable(blob);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof blob>, Uint8Array>
>;
