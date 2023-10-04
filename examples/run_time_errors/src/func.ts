import { func, Principal, Void } from 'azle';

@func([], Void, 'query')
export class MyFunc {}

export function returnNonArrayValueAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return 'invalid type';
}

export function returnEmptyObjectAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return {};
}

export function returnEmptyArrayAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return [];
}

export function returnNonPrincipalValueAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return ['non-principal value', 'methodName'];
}

export function returnEmptyObjectPrincipalAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return [{}, 'methodName'];
}

export function returnArrayWithOnlyPrincipalAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return [Principal.fromText('aaaaa-aa')];
}

export function returnNonStringCanisterMethodNameAsInvalidFunc(): MyFunc {
    // @ts-expect-error
    return [Principal.fromText('aaaaa-aa'), false];
}
