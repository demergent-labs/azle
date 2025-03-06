import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { blob } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(blob);
testSerializable(blob);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof blob>, Uint8Array>
>;
