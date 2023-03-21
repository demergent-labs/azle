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
    return ic.stableSize();
}

$query;
export function stable64_size(): nat64 {
    return ic.stable64Size();
}

$update;
export function stable_grow(new_pages: nat32): StableGrowResult {
    return ic.stableGrow(new_pages);
}

$update;
export function stable64_grow(new_pages: nat64): Stable64GrowResult {
    return ic.stable64Grow(new_pages);
}

$update;
export function stable_write(offset: nat32, buf: blob): void {
    ic.stableWrite(offset, buf);
}

$update;
export function stable64_write(offset: nat64, buf: blob): void {
    ic.stable64Write(offset, buf);
}

$query;
export function stable_read(offset: nat32, length: nat32): blob {
    return ic.stableRead(offset, length);
}

$query;
export function stable64_read(offset: nat64, length: nat64): blob {
    return ic.stable64Read(offset, length);
}

$query;
export function stable_bytes(): blob {
    return ic.stableBytes();
}
