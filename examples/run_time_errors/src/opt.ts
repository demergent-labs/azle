import { $query, Opt } from 'azle';

$query;
export function returnNonObject(): Opt<string> {
    // @ts-expect-error
    return true;
}

$query;
export function returnBothSomeAndNone(): Opt<string> {
    // @ts-expect-error
    return { Some: 'string', None: null };
}

$query;
export function returnObjectWithNeitherSomeNorNone(): Opt<string> {
    // @ts-expect-error
    return { Non: null };
}

$query;
export function returnNonNullNone(): Opt<string> {
    // @ts-expect-error
    return { None: 'not null value' };
}

$query;
export function returnInvalidSomeValue(): Opt<string> {
    // @ts-expect-error
    return { Some: null };
}
