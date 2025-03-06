import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Principal } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(Principal);
testSerializable(Principal);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Principal>, Principal>
>;
