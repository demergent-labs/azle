import { blob } from '../../../src/lib/experimental';
import { TypeMapping } from '../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(blob);
testSerializable(blob);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof blob>, Uint8Array>
>;
