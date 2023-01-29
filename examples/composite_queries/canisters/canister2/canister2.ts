import { ic, Manual, nat, Principal, Query, Update } from 'azle';
import { StringQueryResult } from '../canister1/types';
import { Canister3, Canister3Old } from '../canister3/types';

const canister3_old: Canister3Old = ic.canisters.Canister3Old(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

let counter: nat = 0n;

export async function inc_counter(): Promise<Query<nat>> {
    counter += 1n;
    return counter;
}

export function simple_query(): Query<string> {
    return 'Hello from Canister 2';
}

export function update_query(): Update<string> {
    return 'Hello from a Canister 2 update';
}

export function manual_query(): Query<Manual<string>> {
    ic.reply('Hello from Canister 2 manual_query');
}

export async function deep_query(): Promise<Query<StringQueryResult>> {
    return await canister3.deep_query().call();
}

// class API

import { query, update } from 'azle';

const canister3 = new Canister3(
    Principal.fromText('r7inp-6aaaa-aaaaa-aaabq-cai')
);

export default class {
    counter: nat = 0n;

    @query
    async inc_counter(): Promise<nat> {
        this.counter += 1n;
        return this.counter;
    }

    @query
    simple_query(): string {
        return 'Hello from Canister 2';
    }

    @update
    update_query(): string {
        return 'Hello from a Canister 2 update';
    }

    @query
    manual_query(): Manual<string> {
        ic.reply('Hello from Canister 2 manual_query');
    }

    @query
    async deep_query(): Promise<StringQueryResult> {
        return await canister3.deep_query().call();
    }
}
