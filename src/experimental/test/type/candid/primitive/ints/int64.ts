import '#experimental/build/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int64 } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(int64);
testSerializable(int64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int64>, bigint>
>;
