import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat32 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(nat32);
testSerializable(nat32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat32>, number>
>;
