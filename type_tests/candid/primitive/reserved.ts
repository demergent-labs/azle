import { reserved } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    IsAny,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(reserved);
testSerializable(reserved);

export type TestTypeMapping = AssertType<IsAny<TypeMapping<typeof reserved>>>;
