import { ic, Manual, match, nat, Principal, $query, $update } from 'azle';
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
    const canister_result = await canister2.deep_query().call();

    return match(canister_result, {
        Ok: (stringQueryResult) =>
            match(stringQueryResult, {
                Ok: (stringQuery) => ({ Ok: stringQuery }),
                Err: (err) => ({ Err: err })
            }),
        Err: (err) => ({ Err: err })
    });
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
    const canister_result = await canister2.deep_query().call();

    return match(canister_result, {
        Ok: (stringQueryResult) =>
            match(stringQueryResult, {
                Ok: (stringQuery) => ({ Ok: stringQuery }),
                Err: (err) => ({ Err: err })
            }),
        Err: (err) => ({ Err: err })
    });
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

    return match(canister1_a_result, {
        Ok: async (canister1_a_ok) => {
            const canister1_b_result = await canister1.inc_counter().call();

            return match(canister1_b_result, {
                Ok: (canister1_b_ok) => ({
                    Ok: counter + canister1_a_ok + canister1_b_ok
                }),
                Err: (err) => ({ Err: err })
            });
        },
        Err: (err) => ({ Err: err })
    });
}

// Composite query calling queries that modify the state
$query;
export async function inc_canister2(): Promise<NatQueryResult> {
    counter += 1n;

    const canister2_a_result = await canister2.inc_counter().call();

    return match(canister2_a_result, {
        Ok: async (canister2_a_ok) => {
            const canister2_b_result = await canister2.inc_counter().call();

            return match(canister2_b_result, {
                Ok: (canister2_b_ok) => ({
                    Ok: counter + canister2_a_ok + canister2_b_ok
                }),
                Err: (err) => ({ Err: err })
            });
        },
        Err: (err) => ({ Err: err })
    });
}
