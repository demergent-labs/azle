import { nat } from '../../../../src/lib/experimental';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(nat);
testSerializable(nat);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat>, bigint>
>;
