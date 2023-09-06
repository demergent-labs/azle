import { Result } from 'azle';

export function returnNonObjectAsInvalidResult(): Result<string, string> {
    // @ts-expect-error
    return true;
}

export function returnBothOkAndErr(): Result<string, string> {
    // @ts-expect-error
    return { Ok: 'string', Err: null };
}

export function returnObjectWithNeitherOkNorErr(): Result<string, string> {
    // @ts-expect-error
    return { Error: null };
}

export function returnInvalidOkValue(): Result<string, string> {
    // @ts-expect-error
    return { Ok: null };
}

export function returnInvalidErrValue(): Result<string, string> {
    // @ts-expect-error
    return { Err: null };
}
