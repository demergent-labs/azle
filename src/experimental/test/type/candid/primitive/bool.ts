import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { bool } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(bool);
testSerializable(bool);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof bool>, boolean>
>;
