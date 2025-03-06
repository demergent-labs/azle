import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { nat8 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(nat8);
testSerializable(nat8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat8>, number>
>;
