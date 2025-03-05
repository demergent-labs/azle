import { int } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int);
testSerializable(int);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int>, bigint>
>;
