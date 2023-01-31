import { CanisterResult, ExternalCanister, query } from 'azle';

export type Canister3Old = Canister<{
    deep_query(): CanisterResult<string>;
}>;

export class Canister3 extends ExternalCanister {
    @query
    deep_query: () => CanisterResult<string>;
}
