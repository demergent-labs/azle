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

type CanisterStatus = Variant<{
    running?: null;
    stopping?: null;
    stopped?: null;
}>

type CanisterStatusArgs = {
    // canister_id: string;
    canister_id: Principal; // TODO Principal is broken when creating candid Records
};

type DefiniteCanisterSettings = {
    controllers: Principal[];
    compute_allocation: nat;
    memory_allocation: nat;
    freezing_threshold: nat;
};

type CanisterStatusResult = {
    // status: CanisterStatus;
    // settings: DefiniteCanisterSettings;
    // module_hash: Opt<nat8[]>;
    // memory_size: nat;
    cycles: nat;
};

type Management = Canister<{
    raw_rand(): UpdateAsync<nat8[]>;
    canister_status(canisterStatusArgs: CanisterStatusArgs): UpdateAsync<CanisterStatusResult>;
}>;

type Canister2 = Canister<{
    transfer(
        from: string,
        to: string,
        amount: int32
    ): UpdateAsync<int32>;
}>;

let canister2 = ic.canisters.Canister2<Canister2>('ryjl3-tyaaa-aaaaa-aaaba-cai');

export function* initiateTransfer(): UpdateAsync<int32> {
    return yield canister2.transfer(
        '0',
        '1',
        50
    );
}

export function* randomness(): UpdateAsync<nat8[]> {
    const managementCanister = ic.canisters.Management<Management>('aaaaa-aa');

    return yield managementCanister.raw_rand();
}

export function* status(): UpdateAsync<nat> {
    const management_canister = ic.canisters.Management<Management>('aaaaa-aa');

    const canisterStatusResult: CanisterStatusResult = yield management_canister.canister_status({
        canister_id: ic.id()
    });

    return canisterStatusResult.cycles;
}