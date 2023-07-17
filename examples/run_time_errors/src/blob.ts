import { $query, blob } from 'azle';

$query;
export function returnNonObjectAsInvalidBlob(): blob {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function returnEmptyObjectAsInvalidBlob(): blob {
    // @ts-expect-error
    return {};
}
