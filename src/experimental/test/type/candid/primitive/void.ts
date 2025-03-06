import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { Void } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';
import { AssertType, NotAnyAndExact } from '#test/type/assert_type';

testCandidType(Void);
testSerializable(Void);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Void>, void>
>;
