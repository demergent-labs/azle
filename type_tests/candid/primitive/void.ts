import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Void } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '#test/types/assert_type';

testCandidType(Void);
testSerializable(Void);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Void>, void>
>;
