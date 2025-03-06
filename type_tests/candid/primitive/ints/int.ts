import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(int);
testSerializable(int);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int>, bigint>
>;
