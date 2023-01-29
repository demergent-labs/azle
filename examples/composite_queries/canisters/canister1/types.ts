import { Canister, CanisterResult, nat, Variant } from 'azle';

export type StringQueryResult = Variant<{
    ok: string;
    err: string;
}>;

export type NatQueryResult = Variant<{
    ok: nat;
    err: string;
}>;

export type Canister1Old = Canister<{
    inc_counter(): CanisterResult<nat>;
}>;

// class API

import { ExternalCanister, method } from 'azle';

export class Canister1 extends ExternalCanister {
    @method
    inc_counter: () => CanisterResult<nat>;
}
