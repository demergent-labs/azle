import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { reserved } from '#experimental/lib/index';
import {
    AssertType,
    IsAny,
    testCandidType,
    testSerializable
} from '#experimental/test/types/assert_type';

testCandidType(reserved);
testSerializable(reserved);

export type TestTypeMapping = AssertType<IsAny<TypeMapping<typeof reserved>>>;
