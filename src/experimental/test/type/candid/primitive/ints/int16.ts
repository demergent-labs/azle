import '#experimental/lib/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { int16 } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(int16);
testSerializable(int16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int16>, number>
>;
