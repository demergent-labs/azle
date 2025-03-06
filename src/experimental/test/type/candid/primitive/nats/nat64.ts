import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat64 } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(nat64);
testSerializable(nat64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat64>, bigint>
>;
