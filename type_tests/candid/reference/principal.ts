import { Principal } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(Principal);
testSerializable(Principal);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Principal>, Principal>
>;
