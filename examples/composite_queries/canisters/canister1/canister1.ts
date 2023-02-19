import { ic, Manual, nat, ok, Principal, $query, $update } from 'azle';
import { Canister1 } from '../canister1/types';
import { Canister2 } from '../canister2/types';
import { NatQueryResult, StringQueryResult } from './types';

const canister1 = new Canister1(
    Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
);

const canister2 = new Canister2(
    Principal.fromText('ryjl3-tyaaa-aaaaa-aaaba-cai')
);

let counter: nat = 0n;

// Composite query calling a query
$query;
export async function simple_composite_query(): Promise<StringQueryResult> {
    return await canister2.simple_query().call();
}

// Composite query calling a manual query
$query;
export async function manual_query(): Promise<StringQueryResult> {
    return await canister2.manual_query().call();
}

// Manual composite query calling a manual query
$query;
export async function totally_manual_query(): Promise<
    Manual<StringQueryResult>
> {
    ic.reply(await canister2.manual_query().call());
}

// Composite query calling another composite query
$query;
export async function deep_query(): Promise<StringQueryResult> {
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
$query;
export async function update_query(): Promise<StringQueryResult> {
    return await canister2.update_query().call();
}

// Composite query being called by a query method. SHOULDN'T WORK
$query;
export async function simple_query(): Promise<StringQueryResult> {
    return await canister2.simple_query().call();
}

// Composite query being called by an update method. SHOULDN'T WORK
$update;
export async function simple_update(): Promise<StringQueryResult> {
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

// Composite query that modifies the state. Should revert after the call is done
$query;
export async function inc_counter(): Promise<nat> {
    counter += 1n;
    return counter;
}

// Composite query calling queries on the same canister. SHOULDN'T WORK
$query;
export async function inc_canister1(): Promise<NatQueryResult> {
    counter += 1n;

    const canister1_a_result = await canister1.inc_counter().call();
    if (!ok(canister1_a_result))
        return {
            err: canister1_a_result.err
        };

    const canister1_b_result = await canister1.inc_counter().call();
    if (!ok(canister1_b_result))
        return {
            err: canister1_b_result.err
        };

    if (
        canister1_a_result.ok === undefined ||
        canister1_b_result.ok === undefined
    ) {
        return {
            err: 'One of the increments was unsuccessful'
        };
    }

    return {
        ok: counter + canister1_a_result.ok + canister1_b_result.ok
    };
}

// Composite query calling queries that modify the state
$query;
export async function inc_canister2(): Promise<NatQueryResult> {
    counter += 1n;

    const canister2_a_result = await canister2.inc_counter().call();
    if (!ok(canister2_a_result))
        return {
            err: canister2_a_result.err
        };

    const canister2_b_result = await canister2.inc_counter().call();
    if (!ok(canister2_b_result))
        return {
            err: canister2_b_result.err
        };

    if (
        canister2_a_result.ok === undefined ||
        canister2_b_result.ok === undefined
    ) {
        return {
            err: 'One of the increments was unsuccessful'
        };
    }

    return {
        ok: counter + canister2_a_result.ok + canister2_b_result.ok
    };
}
