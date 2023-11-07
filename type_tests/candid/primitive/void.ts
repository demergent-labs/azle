import { Void } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(Void);
testSerializable(Void);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof Void>, void>
>;
