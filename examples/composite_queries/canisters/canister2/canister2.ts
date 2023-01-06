import {
    CanisterResult,
    CompositeQuery,
    ic,
    nat,
    Principal,
    Query,
    QueryManual,
    Update
} from 'azle';
import { StringQueryResult } from '../canister1/types';
import { Canister3 } from '../canister3/types';

let canister3 = ic.canisters.Canister3<Canister3>(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

let counter: nat = 0n;

export function inc_counter(): CompositeQuery<nat> {
    counter += 1n;
    return counter;
}

export function simple_query(): Query<string> {
    return 'Hello from Canister 2';
}

export function update_query(): Update<string> {
    return 'Hello from a Canister 2 update';
}

export function manual_query(): QueryManual<string> {
    ic.reply('Hello from Canister 2 manual_query');
}

export async function deep_query(): Promise<CompositeQuery<StringQueryResult>> {
    return await canister3.deep_query().call();
}
