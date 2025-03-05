import { nat64 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat64);
testSerializable(nat64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat64>, bigint>
>;
