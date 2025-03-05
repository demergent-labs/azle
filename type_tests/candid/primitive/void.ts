import { Void } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(Void);
testSerializable(Void);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Void>, void>
>;
