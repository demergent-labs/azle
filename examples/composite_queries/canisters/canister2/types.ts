import { Canister, CanisterResult, nat } from 'azle';
import { StringQueryResult } from '../canister1/types';

export type Canister2 = Canister<{
    simple_query(): CanisterResult<string>;
    manual_query(): CanisterResult<string>;
    update_query(): CanisterResult<string>;
    deep_query(): CanisterResult<StringQueryResult>;
    inc_counter(): CanisterResult<nat>;
}>;
