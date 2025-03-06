import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat16 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(nat16);
testSerializable(nat16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat16>, number>
>;
