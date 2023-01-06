import { Canister, CanisterResult, nat, Variant } from 'azle';

export type StringQueryResult = Variant<{
    ok: string;
    err: string;
}>;

export type NatQueryResult = Variant<{
    ok: nat;
    err: string;
}>;

export type Canister1 = Canister<{
    inc_counter(): CanisterResult<nat>;
}>;
