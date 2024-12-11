import { float32 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
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
