import { $query, Vec } from 'azle';

$query;
export function returnNonObjectAsInvalidVec(): Vec<string> {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function returnNonArrayAsInvalidVec(): Vec<string> {
    // @ts-expect-error
    return {};
}

$query;
export function returnArrayWithInvalidVecItem(): Vec<string> {
    // @ts-expect-error
    return [true];
}
