import { Manual, text } from '../../src/lib';
import { AssertType, NotAnyAndExact, testCandidType } from '../assert_type';
import { TypeMapping } from '../../src/lib/candid/type_mapping';

testCandidType(Manual(text));

const testTypeMapping = Manual(text);
export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof testTypeMapping>, void>
>;
