import { CanisterResult, ExternalCanister, nat, query, Variant } from 'azle';

export type StringQueryResult = Variant<{
    ok: string;
    err: string;
}>;

export type NatQueryResult = Variant<{
    ok: nat;
    err: string;
}>;

export class Canister1 extends ExternalCanister {
    @query
    inc_counter: () => CanisterResult<nat>;
}
