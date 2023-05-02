import { ic, Manual, nat, Principal, $query, Result, $update } from 'azle';
import { Canister3 } from '../canister3/types';

const canister3 = new Canister3(
    Principal.fromText(
        process.env.CANISTER3_PRINCIPAL ??
            ic.trap('process.env.CANISTER3_PRINCIPAL is undefined')
    )
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
    ic.reply('Hello from Canister 2 manual query');
}

$query;
export async function deepQuery(): Promise<Result<string, string>> {
    return await canister3.deepQuery().call();
}
