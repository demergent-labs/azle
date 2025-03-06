import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { text } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(text);
testSerializable(text);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof text>, string>
>;
