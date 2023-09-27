import { blob, Canister, update } from 'azle';

export default Canister({
    getBytes: update([blob], blob, (bytes) => {
        return bytes;
    })
});
