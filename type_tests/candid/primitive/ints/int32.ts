import { int32 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int32);
testSerializable(int32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int32>, number>
>;
