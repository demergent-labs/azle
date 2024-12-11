import { reserved } from '../../../src/lib/experimental';
import { TypeMapping } from '../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    IsAny,
    testCandidType,
    testSerializable
} from '../../assert_type';

testCandidType(reserved);
testSerializable(reserved);

export type TestTypeMapping = AssertType<IsAny<TypeMapping<typeof reserved>>>;
