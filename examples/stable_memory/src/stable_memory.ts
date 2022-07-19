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

export function stable_write(offset: nat32, buf: blob): Update<void> {
    ic.stable_write(offset, buf);
}

export function stable64_write(offset: nat64, buf: blob): Update<void> {
    ic.stable64_write(offset, buf);
}

export function stable_read(offset: nat32, length: nat32): Query<blob> {
    return ic.stable_read(offset, length);
}

export function stable64_read(offset: nat64, length: nat64): Query<blob> {
    return ic.stable64_read(offset, length);
}

export function stable_bytes(): Query<blob> {
    return ic.stable_bytes();
}
