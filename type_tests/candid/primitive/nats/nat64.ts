import { nat64 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat64);
testSerializable(nat64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat64>, bigint>
>;
