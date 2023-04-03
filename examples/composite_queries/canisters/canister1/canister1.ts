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
export async function simpleCompositeQuery(): Promise<StringQueryResult> {
    return await canister2.simpleQuery().call();
}

// Composite query calling a manual query
$query;
export async function manualQuery(): Promise<StringQueryResult> {
    return await canister2.manualQuery().call();
}

// Manual composite query calling a manual query
$query;
export async function totallyManualQuery(): Promise<Manual<StringQueryResult>> {
    ic.reply(await canister2.manualQuery().call());
}

// Composite query calling another composite query
$query;
export async function deepQuery(): Promise<StringQueryResult> {
    const callResult = await canister2.deepQuery().call();

    return match(callResult, {
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
export async function updateQuery(): Promise<StringQueryResult> {
    return await canister2.updateQuery().call();
}

// Composite query being called by a query method. SHOULDN'T WORK
$query;
export async function simpleQuery(): Promise<StringQueryResult> {
    return await canister2.simpleQuery().call();
}

// Composite query being called by an update method. SHOULDN'T WORK
$update;
export async function simpleUpdate(): Promise<StringQueryResult> {
    const callResult = await canister2.deepQuery().call();

    return match(callResult, {
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
export async function incCounter(): Promise<nat> {
    counter += 1n;
    return counter;
}

// Composite query calling queries on the same canister. SHOULDN'T WORK
$query;
export async function incCanister1(): Promise<NatQueryResult> {
    counter += 1n;

    const canister1AResult = await canister1.incCounter().call();

    return match(canister1AResult, {
        Ok: async (canister1AOk) => {
            const canister1BResult = await canister1.incCounter().call();

            return match(canister1BResult, {
                Ok: (canister1BOk) => ({
                    Ok: counter + canister1AOk + canister1BOk
                }),
                Err: (err) => ({ Err: err })
            });
        },
        Err: (err) => ({ Err: err })
    });
}

// Composite query calling queries that modify the state
$query;
export async function incCanister2(): Promise<NatQueryResult> {
    counter += 1n;

    const canister2AResult = await canister2.incCounter().call();

    return match(canister2AResult, {
        Ok: async (canister2AOk) => {
            const canister2BResult = await canister2.incCounter().call();

            return match(canister2BResult, {
                Ok: (canister2BOk) => ({
                    Ok: counter + canister2AOk + canister2BOk
                }),
                Err: (err) => ({ Err: err })
            });
        },
        Err: (err) => ({ Err: err })
    });
}
