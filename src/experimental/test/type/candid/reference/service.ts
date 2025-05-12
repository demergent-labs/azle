import '#experimental/lib/assert_experimental';

// TODO what's going on with the types?
// TODO if you pass in a Canister as a parameter to query or update
// TODO shouldn't it already have its id assigned?
// TODO also if you pass one in as a parameter
// TODO it seems to have an IDL function, even though the type says it shouldn't
// TODO we probably need to rework Service/Canister a bit
import { Canister } from '#experimental/lib/index';
import { testCandidType } from '#experimental/test/type/assert_type';

const TestCanister = Canister({});

testCandidType(TestCanister);
// testSerializable(TestCanister);

// export type TestTypeMapping = AssertType<
//     NotAnyAndExact<TypeMapping<typeof TestCanister>, [Principal, string]>
// >;
