import { Null } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(Null);
testSerializable(Null);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Null>, null>
>;
