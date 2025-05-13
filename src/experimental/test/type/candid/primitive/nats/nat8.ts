import '#experimental/lib/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat8 } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(nat8);
testSerializable(nat8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat8>, number>
>;
