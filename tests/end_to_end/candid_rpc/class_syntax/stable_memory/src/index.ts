import {
    IDL,
    query,
    stableBytes,
    stableGrow,
    stableRead,
    stableSize,
    stableWrite,
    update
} from 'azle';

const STABLE_BYTES_SIZE = 655_360;

export default class StableCanister {
    @query([], IDL.Nat64)
    stableSize(): bigint {
        return stableSize();
    }

    @update([IDL.Nat64], IDL.Nat64)
    stableGrow(newPages: bigint): bigint {
        return stableGrow(newPages);
    }

    @update([IDL.Nat64, IDL.Vec(IDL.Nat8)])
    stableWrite(offset: bigint, buf: Uint8Array): void {
        stableWrite(offset, buf);
    }

    @query([IDL.Nat64, IDL.Nat64], IDL.Vec(IDL.Nat8))
    stableRead(offset: bigint, length: bigint): Uint8Array {
        return stableRead(offset, length);
    }

    @query([], IDL.Vec(IDL.Nat8))
    stableBytes(): Uint8Array {
        return stableBytes().slice(0, STABLE_BYTES_SIZE);
    }
}
