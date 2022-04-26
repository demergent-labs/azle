import {
    UpdateAsync,
    nat8,
    ic,
    CanisterResult,
    Async
} from 'azle';
import { ManagementCanister } from 'azle/canisters/management';

export function* get_randomness_directly(): UpdateAsync<nat8[]> {
    const randomness_result: CanisterResult<nat8[]> = yield ManagementCanister.raw_rand();

    if (randomness_result.ok !== undefined) {
        return randomness_result.ok;
    }
    else {
        return [];
    }
}

// TODO I think the yield's are non-negotiable whenever you call a generator
// TODO To deal with dependencies on the generator result, like if any code depends on the result
// TODO of a generator being called, we need to use a yield

// TODO I think the appropriate syntax might be to always yield on any generator, and to never use the .next().value syntax

// TODO Yes I think the correct syntax is to always yield the object, never call .next().value, and now we need to recursively
// TODO or emulating recursively walk through the generators

// TODO the problem is that there has to be a direct yield path from the cross canister call
// TODO there can be no indirection, because the informational object that is returned from the
// TODO cross canister call has to be yielding out of the first generator
// TODO you cannot yield another generator, and that I believe is the main issue
// TODO let's hoep this can be solved!!!

export function* get_randomness_indirectly(): UpdateAsync<nat8[]> {
    const indirect_randomness: nat8[] = yield get_randomness();

    return indirect_randomness;
}

function* get_randomness(): Async<nat8[]> {
    const randomness_result: CanisterResult<nat8[]> = yield ManagementCanister.raw_rand();

    if (randomness_result.ok !== undefined) {
        return randomness_result.ok;
    }
    else {
        return [];
    }
}