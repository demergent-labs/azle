import { blob, empty, text } from 'azle';

export function returnInvalidBooleanValue(): boolean {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidEmptyValue(): empty {
    // @ts-expect-error
    return 'invalid type';
}

export function returnInvalidNullValue(): null {
    // @ts-expect-error
    return 'invalid type';
}

// export function returnInvalidReservedValue(): reserved {
//     return `
//         note: anything/everything can be reserved so there isn't any
//         way to return an invalid reserved type
//     `;
// }

export function returnInvalidStringValue(): string {
    // @ts-expect-error
    return false;
}

export function returnInvalidTextValue(): text {
    // @ts-expect-error
    return false;
}

export function returnInvalidVoidValue(): void {
    // @ts-expect-error
    return 'invalid type';
}

type MyVoid = void;

export function returnInvalidVoidAliasValue(): MyVoid {
    // @ts-expect-error
    return null;
}

type MyNull = null;

export function returnInvalidNullAliasValue(): MyNull {
    // @ts-expect-error
    return undefined;
}
