import { int32 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(int32);
testSerializable(int32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int32>, number>
>;
