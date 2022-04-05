import {
    UpdateAsync,
    ic,
    int32,
    Canister,
    nat8,
    Principal,
    Variant,
    Opt,
    nat,
    Management,
    CanisterStatusResult
} from 'azle';

export function* randomness(): UpdateAsync<nat8[]> {
    const managementCanister = ic.canisters.Management<Management>('aaaaa-aa');

    return yield managementCanister.raw_rand();
}

export function* status(): UpdateAsync<CanisterStatusResult> {
    const management_canister = ic.canisters.Management<Management>('aaaaa-aa');

    const canisterStatusResult: CanisterStatusResult = yield management_canister.canister_status({
        canister_id: ic.id()
    });

    return canisterStatusResult;
}