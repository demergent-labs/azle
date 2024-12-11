import { nat16 } from '../../../../src/lib/experimental';
import { TypeMapping } from '../../../../src/lib/experimental/candid/type_mapping';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../../assert_type';

testCandidType(nat16);
testSerializable(nat16);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof nat16>, number>
>;
