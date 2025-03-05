import { text } from '#experimental/lib';
import { TypeMapping } from '#experimental/lib/candid/type_mapping';

import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(text);
testSerializable(text);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof text>, string>
>;
