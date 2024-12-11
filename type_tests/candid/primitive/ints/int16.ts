import { int16 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(int16);
testSerializable(int16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int16>, number>
>;
