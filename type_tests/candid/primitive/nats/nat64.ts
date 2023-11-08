import { nat64 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(nat64);
testSerializable(nat64);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat64>, bigint>
>;
