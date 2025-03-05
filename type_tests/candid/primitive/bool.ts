import { bool } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(bool);
testSerializable(bool);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof bool>, boolean>
>;
