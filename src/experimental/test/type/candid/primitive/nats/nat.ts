import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';
testCandidType(nat);
testSerializable(nat);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat>, bigint>
>;
