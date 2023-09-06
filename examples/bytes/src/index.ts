import { blob, Service, update } from 'azle';

export default class extends Service {
    @update([blob], blob)
    getBytes(bytes: blob): blob {
        return bytes;
    }
}
