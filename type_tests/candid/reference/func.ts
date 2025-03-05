// TODO we aren't really testing that Func only accepts CandidType
// TODO we aren't really testing the params and return type

import { Func, Principal, Void } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

const TestFunc = Func([], Void, 'query');

testCandidType(TestFunc);
testSerializable(TestFunc);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof TestFunc>, [Principal, string]>
>;
