import { Async, blob, CanisterResult, Update } from 'azle';
import { ManagementCanister } from 'azle/canisters/management';

export function* get_randomness_directly(): Update<blob> {
    const randomness_result: CanisterResult<blob> =
        yield ManagementCanister.raw_rand();

    if (randomness_result.ok !== undefined) {
        return randomness_result.ok;
    } else {
        return Uint8Array.from([]);
    }
}

export function* get_randomness_indirectly(): Update<blob> {
    const indirect_randomness: blob = yield get_randomness();

    return indirect_randomness;
}

export function* get_randomness_super_indirectly(): Update<blob> {
    const randomness0: blob = yield get_randomness_level0();
    const randomness1: blob = yield get_randomness_level1();
    const randomness2: blob = yield get_randomness_level2();

    return Uint8Array.from([...randomness0, ...randomness1, ...randomness2]);
}

function* get_randomness_level0(): Async<blob> {
    return yield get_randomness_level1();
}

function* get_randomness_level1(): Async<blob> {
    return yield get_randomness_level2();
}

function* get_randomness_level2(): Async<blob> {
    return yield get_randomness();
}

function* get_randomness(): Async<blob> {
    const randomness_result: CanisterResult<blob> =
        yield ManagementCanister.raw_rand();

    if (randomness_result.ok !== undefined) {
        return randomness_result.ok;
    } else {
        return Uint8Array.from([]);
    }
}
