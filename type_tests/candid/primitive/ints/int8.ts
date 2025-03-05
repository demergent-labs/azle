import { int8 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int8);
testSerializable(int8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int8>, number>
>;
