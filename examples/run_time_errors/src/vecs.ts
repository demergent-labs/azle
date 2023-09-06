import { Vec } from 'azle';

export function returnNonObjectAsInvalidVec(): Vec<string> {
    // @ts-expect-error
    return 'invalid type';
}

export function returnNonArrayAsInvalidVec(): Vec<string> {
    // @ts-expect-error
    return {};
}

export function returnArrayWithInvalidVecItem(): Vec<string> {
    // @ts-expect-error
    return [true];
}
