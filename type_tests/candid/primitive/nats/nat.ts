import { nat } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat);
testSerializable(nat);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat>, bigint>
>;
