import { int } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int);
testSerializable(int);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int>, bigint>
>;
