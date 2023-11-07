import { nat8 } from '../../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';
import { TypeMapping } from '../../../../src/lib/candid/type_mapping';

testCandidType(nat8);
testSerializable(nat8);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat8>, number>
>;
