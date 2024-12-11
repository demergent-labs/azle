import { int64 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int64);
testSerializable(int64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int64>, bigint>
>;
