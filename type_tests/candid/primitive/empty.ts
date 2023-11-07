import { empty } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

testCandidType(empty);
testSerializable(empty);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof empty>, never>
>;
