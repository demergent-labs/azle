import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { reserved } from '#experimental/lib/index';
import {
    testCandidType,
    testSerializable
} from '#experimental/test/type/assert_type';
import { AssertType, IsAny } from '#test/type/assert_type';
testCandidType(reserved);
testSerializable(reserved);

export type TestTypeMapping = AssertType<IsAny<TypeMapping<typeof reserved>>>;
