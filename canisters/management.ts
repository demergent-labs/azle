import {
    Variant,
    Canister,
    Principal,
    nat,
    nat8,
    Opt,
    UpdateAsync
} from '../index';

export type CanisterStatus = Variant<{
    running?: null;
    stopping?: null;
    stopped?: null;
}>

export type CanisterStatusArgs = {
    canister_id: Principal;
};

export type DefiniteCanisterSettings = {
    controllers: Principal[];
    compute_allocation: nat;
    memory_allocation: nat;
    freezing_threshold: nat;
};

export type CanisterStatusResult = {
    status: CanisterStatus;
    settings: DefiniteCanisterSettings;
    module_hash: Opt<nat8[]>;
    memory_size: nat;
    cycles: nat;
};

// TODO let's see if we can automatically export this elsewhere...we do not want it to get picked up if it's not being used
export type Management = Canister<{
    raw_rand(): UpdateAsync<nat8[]>;
    canister_status(canisterStatusArgs: CanisterStatusArgs): UpdateAsync<CanisterStatusResult>;
}>;