import { nat8 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat8);
testSerializable(nat8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat8>, number>
>;
