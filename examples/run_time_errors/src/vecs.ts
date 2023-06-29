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
