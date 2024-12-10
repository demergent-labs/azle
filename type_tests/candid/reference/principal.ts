import { Principal } from '../../../src/lib/experimental';
import { TypeMapping } from '../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(Principal);
testSerializable(Principal);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Principal>, Principal>
>;
