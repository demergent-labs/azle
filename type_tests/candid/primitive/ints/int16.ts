import { int16 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int16);
testSerializable(int16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int16>, number>
>;
