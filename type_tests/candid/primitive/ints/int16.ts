import { int16 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(int16);
testSerializable(int16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof int16>, number>
>;
