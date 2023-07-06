import {
    blob,
    ic,
    nat32,
    nat64,
    $query,
    Result,
    StableMemoryError,
    $update
} from 'azle';

$query;
export function stableSize(): nat32 {
    return ic.stableSize();
}

$query;
export function stable64Size(): nat64 {
    return ic.stable64Size();
}

$update;
export function stableGrow(newPages: nat32): Result<nat32, StableMemoryError> {
    return ic.stableGrow(newPages);
}

$update;
export function stable64Grow(
    newPages: nat64
): Result<nat64, StableMemoryError> {
    return ic.stable64Grow(newPages);
}

$update;
export function stableWrite(offset: nat32, buf: blob): void {
    ic.stableWrite(offset, buf);
}

$update;
export function stable64Write(offset: nat64, buf: blob): void {
    ic.stable64Write(offset, buf);
}

$query;
export function stableRead(offset: nat32, length: nat32): blob {
    return ic.stableRead(offset, length);
}

$query;
export function stable64Read(offset: nat64, length: nat64): blob {
    return ic.stable64Read(offset, length);
}

$query;
export function stableBytes(): blob {
    return ic.stableBytes();
}
