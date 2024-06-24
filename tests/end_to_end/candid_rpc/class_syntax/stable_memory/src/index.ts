import { ic, IDL, query, update } from 'azle';

const STABLE_BYTES_SIZE = 655_360;

export default class StableCanister {
    @query([], IDL.Nat32)
    stableSize(): number {
        return ic.stableSize();
    }

    @query([], IDL.Nat64)
    stable64Size(): bigint {
        return ic.stable64Size();
    }

    @update([IDL.Nat32], IDL.Nat32)
    stableGrow(newPages: number): number {
        return ic.stableGrow(newPages);
    }

    @update([IDL.Nat64], IDL.Nat64)
    stable64Grow(newPages: bigint): bigint {
        return ic.stable64Grow(newPages);
    }

    @update([IDL.Nat32, IDL.Vec(IDL.Nat8)])
    stableWrite(offset: number, buf: Uint8Array): void {
        ic.stableWrite(offset, buf);
    }

    @update([IDL.Nat64, IDL.Vec(IDL.Nat8)])
    stable64Write(offset: bigint, buf: Uint8Array): void {
        ic.stable64Write(offset, buf);
    }

    @query([IDL.Nat32, IDL.Nat32], IDL.Vec(IDL.Nat8))
    stableRead(offset: number, length: number): Uint8Array {
        return ic.stableRead(offset, length);
    }

    @query([IDL.Nat64, IDL.Nat64], IDL.Vec(IDL.Nat8))
    stable64Read(offset: bigint, length: bigint): Uint8Array {
        return ic.stable64Read(offset, length);
    }

    @query([], IDL.Vec(IDL.Nat8))
    stableBytes(): Uint8Array {
        return ic.stableBytes().slice(0, STABLE_BYTES_SIZE);
    }
}
