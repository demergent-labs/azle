import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { float64 } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(float64);
testSerializable(float64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float64>, number>
>;
