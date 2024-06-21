import { blob, update } from 'azle/experimental';

export default class {
    @update([blob], blob)
    getBytes(bytes) {
        return bytes;
    }
}
