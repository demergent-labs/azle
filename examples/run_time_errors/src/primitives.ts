import { $query, blob, empty, text } from 'azle';

$query;
export function invalidBlobReturnValue(): blob {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function invalidBooleanReturnValue(): boolean {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function invalidEmptyReturnValue(): empty {
    // @ts-expect-error
    return 'invalid type';
}

$query;
export function invalidNullReturnValue(): null {
    // @ts-expect-error
    return 'invalid type';
}

// $query;
// export function invalidReservedReturnValue(): reserved {
//     return `
//         note: anything/everything can be reserved so there isn't any
//         way to return an invalid reserved type
//     `;
// }

$query;
export function invalidStringReturnValue(): string {
    // @ts-expect-error
    return false;
}

$query;
export function invalidTextReturnValue(): text {
    // @ts-expect-error
    return false;
}

$query;
export function invalidVoidReturnValue(): void {
    // @ts-expect-error
    return 'invalid type';
}
