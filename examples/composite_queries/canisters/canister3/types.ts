import { CanisterResult, ExternalCanister, query } from 'azle';

export class Canister3 extends ExternalCanister {
    @query
    deep_query: () => CanisterResult<string>;
}
