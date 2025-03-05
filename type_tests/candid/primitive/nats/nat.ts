import { nat } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat);
testSerializable(nat);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat>, bigint>
>;
