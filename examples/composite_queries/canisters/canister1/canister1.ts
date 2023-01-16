import {
    Update,
    ic,
    nat,
    ok,
    Principal,
    CompositeQuery,
    CanisterResult,
    Query,
    CompositeQueryManual
} from 'azle';
import { Canister2 } from '../canister2/types';
import { Canister1 } from '../canister1/types';
import { NatQueryResult as NatQueryResult, StringQueryResult } from './types';

let canister1 = ic.canisters.Canister1<Canister1>(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);

let canister2 = ic.canisters.Canister2<Canister2>(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

let counter: nat = 0n;

// Composite query calling a query
export async function simple_composite_query(): Promise<
    CompositeQuery<StringQueryResult>
> {
    return await canister2.simple_query().call();
}

// Composite query calling a manual query
export async function manual_query(): Promise<
    CompositeQuery<StringQueryResult>
> {
    return await canister2.manual_query().call();
}

// Manual composite query calling a manual query
export async function totally_manual_query(): Promise<
    CompositeQueryManual<StringQueryResult>
> {
    ic.reply(await canister2.manual_query().call());
}

// Composite query calling another composite query
export async function deep_query(): Promise<CompositeQuery<StringQueryResult>> {
    // return await canister2.deep_query().call();
    const result = await canister2.deep_query().call();
    if (!ok(result)) {
        return {
            err: result.err
        };
    }
    if (!ok(result.ok)) {
        return {
            err: result.ok.err
        };
    }

    return {
        ok: result.ok.ok
    };
}

// Composite query calling an update method. SHOULDN'T WORK
export async function update_query(): Promise<
    CompositeQuery<StringQueryResult>
> {
    return await canister2.update_query().call();
}

// Composite query being called by a query method. SHOULDN'T WORK
export async function simple_query(): Promise<Query<StringQueryResult>> {
    return await canister2.simple_query().call();
}

// Composite query being called by an update method. SHOULDN'T WORK
export async function simple_update(): Promise<Update<StringQueryResult>> {
    let result = await canister2.deep_query().call();
    if (!ok(result)) {
        return {
            err: result.err
        };
    }
    if (!ok(result.ok)) {
        return {
            err: result.ok.err
        };
    }

    return {
        ok: result.ok.ok
    };
}

// Composite query that modifies the state. Should revert after the call is done
export function inc_counter(): CompositeQuery<nat> {
    counter += 1n;
    return counter;
}

// Composite query calling queries on the same canister. SHOULDN'T WORK
export async function inc_canister1(): Promise<CompositeQuery<NatQueryResult>> {
    counter += 1n;

    let canister1_a: CanisterResult<nat> = await canister1.inc_counter().call();
    if ('err' in canister1_a)
        return {
            err: canister1_a.err
        };

    let canister1_b: CanisterResult<nat> = await canister1.inc_counter().call();
    if ('err' in canister1_b)
        return {
            err: canister1_b.err
        };

    if (canister1_a.ok === undefined || canister1_b.ok === undefined) {
        return {
            err: 'One of the increments was unsuccessful'
        };
    }

    return {
        ok: counter + canister1_a.ok + canister1_b.ok
    };
}

// Composite query calling queries that modify the state
export async function inc_canister2(): Promise<CompositeQuery<NatQueryResult>> {
    counter += 1n;

    let canister2_a: CanisterResult<nat> = await canister2.inc_counter().call();
    if ('err' in canister2_a)
        return {
            err: canister2_a.err
        };

    let canister2_b: CanisterResult<nat> = await canister2.inc_counter().call();
    if ('err' in canister2_b)
        return {
            err: canister2_b.err
        };

    if (canister2_a.ok === undefined || canister2_b.ok === undefined) {
        return {
            err: 'One of the increments was unsuccessful'
        };
    }

    return {
        ok: counter + canister2_a.ok + canister2_b.ok
    };
}
