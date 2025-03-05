import { empty } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import { AssertType, NotAnyAndExact, testCandidType } from '../../assert_type';

testCandidType(empty);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof empty>, never>
>;
