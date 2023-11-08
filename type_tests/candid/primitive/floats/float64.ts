import { float64 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(float64);
testSerializable(float64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof float64>, number>
>;
