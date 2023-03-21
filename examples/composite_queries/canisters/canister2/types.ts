import { CanisterResult, ExternalCanister, nat, query, update } from 'azle';
import { StringQueryResult } from '../canister1/types';

export class Canister2 extends ExternalCanister {
    @query
    simpleQuery: () => CanisterResult<string>;

    @query
    manualQuery: () => CanisterResult<string>;

    @update
    updateQuery: () => CanisterResult<string>;

    @query
    deepQuery: () => CanisterResult<StringQueryResult>;

    @query
    incCounter: () => CanisterResult<nat>;
}
