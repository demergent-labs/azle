import { Null } from '../../../src/lib/experimental';
import { TypeMapping } from '../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(Null);
testSerializable(Null);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Null>, null>
>;
