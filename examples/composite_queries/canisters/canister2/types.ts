import { CanisterResult, ExternalCanister, nat, query, update } from 'azle';
import { StringQueryResult } from '../canister1/types';

export class Canister2 extends ExternalCanister {
    @query
    simple_query: () => CanisterResult<string>;

    @query
    manual_query: () => CanisterResult<string>;

    @update
    update_query: () => CanisterResult<string>;

    @query
    deep_query: () => CanisterResult<StringQueryResult>;

    @query
    inc_counter: () => CanisterResult<nat>;
}
