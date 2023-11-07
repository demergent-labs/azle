import { reserved } from '../../../src/lib';
import {
    AssertType,
    IsAny,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(reserved);
testSerializable(reserved);

export type TestTypeMapping = AssertType<IsAny<TypeMapping<typeof reserved>>>;
