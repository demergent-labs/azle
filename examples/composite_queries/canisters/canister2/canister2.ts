import { ic, Manual, nat, Principal, $query, $update } from 'azle';
import { StringQueryResult } from '../canister1/types';
import { Canister3 } from '../canister3/types';

const canister3 = new Canister3(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

let counter: nat = 0n;

// TODO is this supposed to be a query?
$query;
export async function inc_counter(): Promise<nat> {
    counter += 1n;
    return counter;
}

$query;
export function simple_query(): string {
    return 'Hello from Canister 2';
}

$update;
export function update_query(): string {
    return 'Hello from a Canister 2 update';
}

$query;
export function manual_query(): Manual<string> {
    ic.reply('Hello from Canister 2 manual_query');
}

$query;
export async function deep_query(): Promise<StringQueryResult> {
    return await canister3.deep_query().call();
}
