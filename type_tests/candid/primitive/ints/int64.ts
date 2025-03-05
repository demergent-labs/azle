import { int64 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int64);
testSerializable(int64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int64>, bigint>
>;
