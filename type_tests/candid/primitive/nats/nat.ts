import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(nat);
testSerializable(nat);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat>, bigint>
>;
