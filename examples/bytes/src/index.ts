import { blob, Service, update } from 'azle';

export default Service({
    getBytes: update([blob], blob, (bytes) => {
        return bytes;
    })
});
