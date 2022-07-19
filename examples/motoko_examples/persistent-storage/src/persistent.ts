import { ic, Init, nat, Query, Stable, Update } from 'azle';

type StableStorage = Stable<{
    counter: nat;
}>;

export function init(): Init {
    ic.stable_storage<StableStorage>().counter = 0n;
}

export function increment(): Update<nat> {
    ic.stable_storage<StableStorage>().counter += 1n;
    return ic.stable_storage<StableStorage>().counter;
}

export function get(): Query<nat> {
    return ic.stable_storage<StableStorage>().counter;
}

export function reset(): Update<nat> {
    ic.stable_storage<StableStorage>().counter = 0n;
    return ic.stable_storage<StableStorage>().counter;
}
