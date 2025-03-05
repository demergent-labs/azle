import { float64 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(float64);
testSerializable(float64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float64>, number>
>;
