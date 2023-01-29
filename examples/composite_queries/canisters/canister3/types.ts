import { Canister, CanisterResult } from 'azle';

export type Canister3Old = Canister<{
    deep_query(): CanisterResult<string>;
}>;

// class API

import { ExternalCanister, method } from 'azle';

export class Canister3 extends ExternalCanister {
    @method
    deep_query: () => CanisterResult<string>;
}
