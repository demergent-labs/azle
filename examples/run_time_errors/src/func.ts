import { $query, Func, Principal, Query } from 'azle';

$query;
export function returnNonArrayValueAsInvalidFunc(): Func<Query<() => void>> {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function returnEmptyObjectAsInvalidFunc(): Func<Query<() => void>> {
    // @ts-expect-error
    return {};
}

$query;
export function returnEmptyArrayAsInvalidFunc(): Func<Query<() => void>> {
    // @ts-expect-error
    return [];
}

$query;
export function returnNonPrincipalValueAsInvalidFunc(): Func<
    Query<() => void>
> {
    // @ts-expect-error
    return ['non-principal value', 'methodName'];
}

$query;
export function returnEmptyObjectPrincipalAsInvalidFunc(): Func<
    Query<() => void>
> {
    // @ts-expect-error
    return [{}, 'methodName'];
}

$query;
export function returnArrayWithOnlyPrincipalAsInvalidFunc(): Func<
    Query<() => void>
> {
    // @ts-expect-error
    return [Principal.fromText('aaaaa-aa')];
}

$query;
export function returnNonStringCanisterMethodNameAsInvalidFunc(): Func<
    Query<() => void>
> {
    // @ts-expect-error
    return [Principal.fromText('aaaaa-aa'), false];
}
