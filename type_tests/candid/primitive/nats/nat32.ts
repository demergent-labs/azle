import { nat32 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat32);
testSerializable(nat32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat32>, number>
>;
