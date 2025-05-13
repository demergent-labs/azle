import '#experimental/lib/assert_experimental';

import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { empty } from '#experimental/lib/index';
import { testCandidType } from '#experimental/test/type/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(empty);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof empty>, never>
>;
