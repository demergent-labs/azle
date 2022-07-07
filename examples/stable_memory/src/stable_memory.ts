import {
    blob,
    ic,
    nat32,
    nat64,
    Query,
    Update,
    StableGrowResult,
    Stable64GrowResult
} from 'azle';

export function stable_size(): Query<nat32> {
    return ic.stable_size();
}

export function stable64_size(): Query<nat64> {
    return ic.stable64_size();
}

export function stable_grow(new_pages: nat32): Update<StableGrowResult> {
    return ic.stable_grow(new_pages);
}

export function stable64_grow(new_pages: nat64): Update<Stable64GrowResult> {
    return ic.stable64_grow(new_pages);
}

export function stable_write(offset: nat32, buffer: blob): Update<void> {
    ic.stable_write(offset, buffer);
}
