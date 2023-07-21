import { $query, blob, empty, text } from 'azle';

$query;
export function returnInvalidBooleanValue(): boolean {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function returnInvalidEmptyValue(): empty {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function returnInvalidNullValue(): null {
    // @ts-expect-error
    return 'invalid type';
}

// $query;
// export function returnInvalidReservedValue(): reserved {
//     return `
//         note: anything/everything can be reserved so there isn't any
//         way to return an invalid reserved type
//     `;
// }

$query;
export function returnInvalidStringValue(): string {
    // @ts-expect-error
    return false;
}

$query;
export function returnInvalidTextValue(): text {
    // @ts-expect-error
    return false;
}

$query;
export function returnInvalidVoidValue(): void {
    // @ts-expect-error
    return 'invalid type';
}

type MyVoid = void;

$query;
export function returnInvalidVoidAliasValue(): MyVoid {
    // @ts-expect-error
    return null;
}

type MyNull = null;

$query;
export function returnInvalidNullAliasValue(): MyNull {
    // @ts-expect-error
    return undefined;
}
