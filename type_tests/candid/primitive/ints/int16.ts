import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int16 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(int16);
testSerializable(int16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int16>, number>
>;
