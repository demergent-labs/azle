// TODO what's going on with the types?
// TODO if you pass in a Canister as a parameter to query or update
// TODO shouldn't it already have its id assigned?
// TODO also if you pass one in as a parameter
// TODO it seems to have an IDL function, even though the type says it shouldn't
// TODO we probably need to rework Service/Canister a bit

import { Canister, Func, Principal, Void } from '../../../src/lib';
import {
    AssertType,
    NotAnyAndExact,
    testCandidType,
    testSerializable
} from '../../assert_type';
import { TypeMapping } from '../../../src/lib/candid/type_mapping';

const TestCanister = Canister({});

testCandidType(TestCanister);
// testSerializable(TestCanister);

// export type TestTypeMapping = AssertType<
//     NotAnyAndExact<TypeMapping<typeof TestCanister>, [Principal, string]>
// >;
