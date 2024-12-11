import { empty } from '../../../src/lib/experimental';
import { TypeMapping } from '../../../src/lib/experimental/candid/type_mapping';
import { AssertType, NotAnyAndExact, testCandidType } from '../../assert_type';

testCandidType(empty);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof empty>, never>
>;
