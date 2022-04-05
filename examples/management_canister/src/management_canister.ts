import {
    UpdateAsync,
    ic,
    int32,
    Canister,
    nat8,
    Principal,
    Variant,
    Opt,
    nat
} from 'azle';
import {
    Management,
    CanisterStatusArgs,
    CanisterStatusResult
} from 'azle/canisters/management';

export function* raw_rand(): UpdateAsync<nat8[]> {
    const managementCanister = ic.canisters.Management<Management>('aaaaa-aa');

    return yield managementCanister.raw_rand();
}

export function* canister_status(args: CanisterStatusArgs): UpdateAsync<CanisterStatusResult> {
    const management_canister = ic.canisters.Management<Management>('aaaaa-aa');

    const canisterStatusResult: CanisterStatusResult = yield management_canister.canister_status({
        canister_id: args.canister_id
    });

    return canisterStatusResult;
}