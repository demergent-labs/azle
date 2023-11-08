import { nat32 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(nat32);
testSerializable(nat32);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat32>, number>
>;
