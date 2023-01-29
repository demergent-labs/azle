import { Canister, CanisterResult, nat } from 'azle';
import { StringQueryResult } from '../canister1/types';

export type Canister2Old = Canister<{
    simple_query(): CanisterResult<string>;
    manual_query(): CanisterResult<string>;
    update_query(): CanisterResult<string>;
    deep_query(): CanisterResult<StringQueryResult>;
    inc_counter(): CanisterResult<nat>;
}>;

// class API

import { ExternalCanister, method } from 'azle';

export class Canister2 extends ExternalCanister {
    @method
    simple_query: () => CanisterResult<string>;

    @method
    manual_query: () => CanisterResult<string>;

    @method
    update_query: () => CanisterResult<string>;

    @method
    deep_query: () => CanisterResult<StringQueryResult>;

    @method
    inc_counter: () => CanisterResult<nat>;
}
