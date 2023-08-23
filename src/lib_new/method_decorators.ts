import { IDL } from '@dfinity/candid';

export function query(paramsIdls, returnIdl) {
    return (target, key, descriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const decoded = IDL.decode(paramsIdls, args[0]);

            return new Uint8Array(
                IDL.encode([returnIdl], [originalMethod(...decoded)])
            ).buffer;
        };

        return descriptor;
    };
}

export function update(paramsIdls, returnIdl) {
    return (target, key, descriptor) => {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            const decoded = IDL.decode(paramsIdls, args[0]);

            return new Uint8Array(
                IDL.encode([returnIdl], [originalMethod(...decoded)])
            ).buffer;
        };

        return descriptor;
    };
}
