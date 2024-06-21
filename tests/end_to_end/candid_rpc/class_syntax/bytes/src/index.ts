import { blob, Canister, update } from 'azle/experimental';

export default class {
    @update([blob], blob)
    getBytes(bytes) {
        return bytes;
    }
}
