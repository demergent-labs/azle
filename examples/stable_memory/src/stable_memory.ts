import { blob, ic, nat32, nat64, query, update, Void } from 'azle';

export default class {
    @query([], nat32)
    stableSize(): nat32 {
        return ic.stableSize();
    }

    @query([], nat64)
    stable64Size(): nat64 {
        return ic.stable64Size();
    }

    @update([nat32], nat32)
    stableGrow(newPages: nat32): nat32 {
        return ic.stableGrow(newPages);
    }

    @update([nat64], nat64)
    stable64Grow(newPages: nat64): nat64 {
        return ic.stable64Grow(newPages);
    }

    @update([nat32, blob], Void)
    stableWrite(offset: nat32, buf: blob): Void {
        ic.stableWrite(offset, buf);
    }

    @update([nat64, blob], Void)
    stable64Write(offset: nat64, buf: blob): Void {
        ic.stable64Write(offset, buf);
    }

    @query([nat32, nat32], blob)
    stableRead(offset: nat32, length: nat32): blob {
        return ic.stableRead(offset, length);
    }

    @query([nat64, nat64], blob)
    stable64Read(offset: nat64, length: nat64): blob {
        return ic.stable64Read(offset, length);
    }

    @query([], blob)
    stableBytes(): blob {
        return ic.stableBytes();
    }
}
