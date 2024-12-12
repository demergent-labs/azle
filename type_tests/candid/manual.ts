import { Manual, text } from '../../src/lib/experimental';
import { TypeMapping } from '../../src/lib/experimental/candid/type_mapping';
import { AssertType, NotAnyAndExact, testCandidType } from '../assert_type';

testCandidType(Manual(text));

const _testTypeMapping = Manual(text);
export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof _testTypeMapping>, void>
>;
