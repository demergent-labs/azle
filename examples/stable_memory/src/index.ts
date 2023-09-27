import { blob, Canister, ic, nat32, nat64, query, update, Void } from 'azle';

export default Canister({
    stableSize: query([], nat32, () => {
        return ic.stableSize();
    }),
    stable64Size: query([], nat64, () => {
        return ic.stable64Size();
    }),
    stableGrow: update([nat32], nat32, (newPages) => {
        return ic.stableGrow(newPages);
    }),
    stable64Grow: update([nat64], nat64, (newPages) => {
        return ic.stable64Grow(newPages);
    }),
    stableWrite: update([nat32, blob], Void, (offset, buf) => {
        ic.stableWrite(offset, buf);
    }),
    stable64Write: update([nat64, blob], Void, (offset, buf) => {
        ic.stable64Write(offset, buf);
    }),
    stableRead: query([nat32, nat32], blob, (offset, length) => {
        return ic.stableRead(offset, length);
    }),
    stable64Read: query([nat64, nat64], blob, (offset, length) => {
        return ic.stable64Read(offset, length);
    }),
    stableBytes: query([], blob, () => {
        return ic.stableBytes();
    })
});
