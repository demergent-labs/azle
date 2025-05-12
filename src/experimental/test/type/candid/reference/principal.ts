import '#experimental/lib/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Principal } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';

testCandidType(Principal);
testSerializable(Principal);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Principal>, Principal>
>;
