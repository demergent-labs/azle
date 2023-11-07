import { bool } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(bool);
testSerializable(bool);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof bool>, boolean>
>;
