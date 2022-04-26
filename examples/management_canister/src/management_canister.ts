// TODO we want to test all of the management canister functions, only two are shown here

import {
    UpdateAsync,
    nat8,
    Variant,
    CanisterResult
} from 'azle';
import {
    ManagementCanister,
    CanisterStatusArgs,
    CanisterStatusResult
} from 'azle/canisters/management';

type RawRandResult = Variant<{
    ok?: nat8[];
    err?: string;
}>;

export function* raw_rand(): UpdateAsync<RawRandResult> {
    const raw_rand_canister_result: CanisterResult<nat8[]> = yield ManagementCanister.raw_rand();

    if (raw_rand_canister_result.ok === undefined) {
        return {
            err: raw_rand_canister_result.err
        };
    }

    const randomness = raw_rand_canister_result.ok;

    return {
        ok: randomness
    };
}

type GetCanisterStatusResult = Variant<{
    ok?: CanisterStatusResult;
    err?: string;
}>;

export function* canister_status(args: CanisterStatusArgs): UpdateAsync<GetCanisterStatusResult> {
    const canister_status_result_canister_result: CanisterResult<CanisterStatusResult> = yield ManagementCanister.canister_status({
        canister_id: args.canister_id
    });

    if (canister_status_result_canister_result.ok === undefined) {
        return {
            err: canister_status_result_canister_result.err
        };
    }

    const canister_status_result = canister_status_result_canister_result.ok;

    return {
        ok: canister_status_result
    };
}