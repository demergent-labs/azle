import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Null } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(Null);
testSerializable(Null);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Null>, null>
>;
