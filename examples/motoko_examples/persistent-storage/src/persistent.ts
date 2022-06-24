import { ic, Init, nat, Query, Stable, Update } from 'azle';

type StableStorage = Stable<{
    counter: nat;
}>;

export function init(): Init {
    ic.stableStorage<StableStorage>().counter = 0n;
}

export function increment(): Update<nat> {
    ic.stableStorage<StableStorage>().counter += 1n;
    return ic.stableStorage<StableStorage>().counter;
}

export function get(): Query<nat> {
    return ic.stableStorage<StableStorage>().counter;
}

export function reset(): Update<nat> {
    ic.stableStorage<StableStorage>().counter = 0n;
    return ic.stableStorage<StableStorage>().counter;
}
