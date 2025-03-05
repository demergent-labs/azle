import { float32 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(float32);
testSerializable(float32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float32>, number>
>;
