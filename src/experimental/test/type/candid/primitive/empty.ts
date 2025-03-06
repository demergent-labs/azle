import { TypeMapping } from '#experimental/lib/candid/type_mapping';
import { empty } from '#experimental/lib/index';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType
} from '#test/types/assert_type';

testCandidType(empty);

export type TestTypeMapping = AssertType<
    NotAnyAndExact<TypeMapping<typeof empty>, never>
>;
