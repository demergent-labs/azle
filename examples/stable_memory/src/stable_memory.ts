import {
    blob,
    ic,
    nat32,
    nat64,
    $query,
    StableGrowResult,
    Stable64GrowResult,
    $update
} from 'azle';

$query;
export function stable_size(): nat32 {
    return ic.stable_size();
}

$query;
export function stable64_size(): nat64 {
    return ic.stable64_size();
}

$update;
export function stable_grow(new_pages: nat32): StableGrowResult {
    return ic.stable_grow(new_pages);
}

$update;
export function stable64_grow(new_pages: nat64): Stable64GrowResult {
    return ic.stable64_grow(new_pages);
}

$update;
export function stable_write(offset: nat32, buf: blob): void {
    ic.stable_write(offset, buf);
}

$update;
export function stable64_write(offset: nat64, buf: blob): void {
    ic.stable64_write(offset, buf);
}

$query;
export function stable_read(offset: nat32, length: nat32): blob {
    return ic.stable_read(offset, length);
}

$query;
export function stable64_read(offset: nat64, length: nat64): blob {
    return ic.stable64_read(offset, length);
}

$query;
export function stable_bytes(): blob {
    return ic.stable_bytes();
}
