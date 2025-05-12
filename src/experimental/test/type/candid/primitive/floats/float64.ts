import '#experimental/lib/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { float64 } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(float64);
testSerializable(float64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float64>, number>
>;
