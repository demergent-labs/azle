import { Canister, CanisterResult } from 'azle';

export type Canister3 = Canister<{
    deep_query(): CanisterResult<string>;
}>;
