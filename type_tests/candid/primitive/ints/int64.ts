import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int64 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(int64);
testSerializable(int64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int64>, bigint>
>;
