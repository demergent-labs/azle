import { int64 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(int64);
testSerializable(int64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int64>, bigint>
>;
