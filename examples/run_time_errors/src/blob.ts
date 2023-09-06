import { blob, query, Service } from 'azle';

export function returnNonObjectAsInvalidBlob(): blob {
    // @ts-expect-error
    return 'invalid type';
}

export function returnEmptyObjectAsInvalidBlob(): blob {
    // @ts-expect-error
    return {};
}
