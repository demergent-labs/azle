import { float64 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
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
