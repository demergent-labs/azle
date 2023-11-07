import { int } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(int);
testSerializable(int);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int>, bigint>
>;
