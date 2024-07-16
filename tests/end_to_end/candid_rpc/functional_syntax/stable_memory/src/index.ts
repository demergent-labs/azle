import {
    blob,
    Canister,
    ic,
    nat64,
    query,
    update,
    Void
} from 'azle/experimental';

const STABLE_BYTES_SIZE = 655_360;

export default Canister({
    stableSize: query([], nat64, () => {
        return ic.stableSize();
    }),
    stableGrow: update([nat64], nat64, (newPages) => {
        return ic.stableGrow(newPages);
    }),
    stableWrite: update([nat64, blob], Void, (offset, buf) => {
        ic.stableWrite(offset, buf);
    }),
    stableRead: query([nat64, nat64], blob, (offset, length) => {
        return ic.stableRead(offset, length);
    }),
    stableBytes: query([], blob, () => {
        return ic.stableBytes().slice(0, STABLE_BYTES_SIZE);
    })
});
