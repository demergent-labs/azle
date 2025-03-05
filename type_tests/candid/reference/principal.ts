import { Principal } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(Principal);
testSerializable(Principal);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Principal>, Principal>
>;
