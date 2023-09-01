import { blob, update } from 'azle';

export default class {
    @update([blob], blob)
    getBytes(bytes: blob): blob {
        return bytes;
    }
}
