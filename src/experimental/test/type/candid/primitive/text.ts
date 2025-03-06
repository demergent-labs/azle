import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { text } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';

testCandidType(text);
testSerializable(text);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof text>, string>
>;
