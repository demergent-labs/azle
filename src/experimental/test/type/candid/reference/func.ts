import '#experimental/lib/assert_experimental';

// TODO we aren't really testing that Func only accepts CandidType
// TODO we aren't really testing the params and return type
import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Func, Principal, Void } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
const TestFunc = Func([], Void, 'query');

testCandidType(TestFunc);
testSerializable(TestFunc);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof TestFunc>, [Principal, string]>
>;
