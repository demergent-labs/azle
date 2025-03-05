import { nat8 } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat8);
testSerializable(nat8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat8>, number>
>;
