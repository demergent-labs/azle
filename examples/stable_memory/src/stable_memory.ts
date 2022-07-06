import { ic, nat32, nat64, Query, Update, StableGrowResult } from 'azle';

export function stable_size(): Query<nat32> {
    return ic.stable_size();
}

export function stable64_size(): Query<nat64> {
    return ic.stable64_size();
}

export function stable_grow(new_pages: nat32): Update<StableGrowResult> {
    return ic.stable_grow(new_pages);
}
