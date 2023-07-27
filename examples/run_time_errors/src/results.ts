import { $query, Result } from 'azle';

$query;
export function returnNonObjectAsInvalidResult(): Result<string, string> {
    // @ts-expect-error
    return true;
}

$query;
export function returnBothOkAndErr(): Result<string, string> {
    // @ts-expect-error
    return { Ok: 'string', Err: null };
}

$query;
export function returnObjectWithNeitherOkNorErr(): Result<string, string> {
    // @ts-expect-error
    return { Error: null };
}

$query;
export function returnInvalidOkValue(): Result<string, string> {
    // @ts-expect-error
    return { Ok: null };
}

$query;
export function returnInvalidErrValue(): Result<string, string> {
    // @ts-expect-error
    return { Err: null };
}
