import '#experimental/lib/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Null } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';

testCandidType(Null);
testSerializable(Null);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Null>, null>
>;
