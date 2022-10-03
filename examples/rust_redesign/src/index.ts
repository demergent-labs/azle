// TODO let's start testing cross canister calls
// TODO I would like to explore doing it all from JS if possible
// TODO we would need to generate the IDL from the Canister type
// TODO consider the complication, the code burden, the cycle costs, etc

// TODO it might be harder to try and create a compiler from Canister TS types to IDL types, a full compiler would probably be necessary
// TODO but the way we are doing it in Rust allows us to heavily rely on the Rust Candid capabilities...

import { Canister, CanisterResult, ic, Principal, Query } from 'azle';

type TestCanister = Canister<{
    test_method(param1: string, param2: string): CanisterResult<string>;
}>;

let test_canister: TestCanister = ic.canisters.TestCanister(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

export function test(): Query<string> {
    return 'hello';
}
