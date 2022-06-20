import { Async, CanisterResult, nat8, UpdateAsync } from 'azle';
import { ManagementCanister } from 'azle/canisters/management';

export function* get_randomness_directly(): UpdateAsync<nat8[]> {
    const randomness_result: CanisterResult<nat8[]> =
        yield ManagementCanister.raw_rand();

    if (randomness_result.ok !== undefined) {
        return randomness_result.ok;
    } else {
        return [];
    }
}

export function* get_randomness_indirectly(): UpdateAsync<nat8[]> {
    const indirect_randomness: nat8[] = yield get_randomness();

    return indirect_randomness;
}

export function* get_randomness_super_indirectly(): UpdateAsync<nat8[]> {
    const randomness0: nat8[] = yield get_randomness_level0();
    const randomness1: nat8[] = yield get_randomness_level1();
    const randomness2: nat8[] = yield get_randomness_level2();

    return [...randomness0, ...randomness1, ...randomness2];
}

function* get_randomness_level0(): Async<nat8[]> {
    return yield get_randomness_level1();
}

function* get_randomness_level1(): Async<nat8[]> {
    return yield get_randomness_level2();
}

function* get_randomness_level2(): Async<nat8[]> {
    return yield get_randomness();
}

function* get_randomness(): Async<nat8[]> {
    const randomness_result: CanisterResult<nat8[]> =
        yield ManagementCanister.raw_rand();

    if (randomness_result.ok !== undefined) {
        return randomness_result.ok;
    } else {
        return [];
    }
}
