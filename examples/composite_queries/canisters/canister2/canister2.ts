import { ic, Manual, nat, Principal, $query, $update } from 'azle';
import { StringQueryResult } from '../canister1/types';
import { Canister3 } from '../canister3/types';

const canister3 = new Canister3(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

let counter: nat = 0n;

// TODO is this supposed to be a query?
$query;
export async function incCounter(): Promise<nat> {
    counter += 1n;
    return counter;
}

$query;
export function simpleQuery(): string {
    return 'Hello from Canister 2';
}

$update;
export function updateQuery(): string {
    return 'Hello from a Canister 2 update';
}

$query;
export function manualQuery(): Manual<string> {
    ic.reply('Hello from Canister 2 manualQuery');
}

$query;
export async function deepQuery(): Promise<StringQueryResult> {
    return await canister3.deepQuery().call();
}
