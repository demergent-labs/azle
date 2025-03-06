import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Manual, text } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType
} from '#experimental/test/types/assert_type';

testCandidType(Manual(text));

const _testTypeMapping = Manual(text);
export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof _testTypeMapping>, void>
>;
