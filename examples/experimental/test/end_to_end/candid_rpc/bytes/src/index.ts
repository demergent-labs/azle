import { blob, Canister, update } from 'azle/experimental';

export default Canister({
    getBytes: update([blob], blob, (bytes) => {
        return bytes;
    })
});
