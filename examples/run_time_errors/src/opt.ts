import { Opt } from 'azle';

export function returnNonObject(): Opt<string> {
    // @ts-expect-error
    return true;
}

export function returnBothSomeAndNone(): Opt<string> {
    // @ts-expect-error
    return { Some: 'string', None: null };
}

export function returnObjectWithNeitherSomeNorNone(): Opt<string> {
    // @ts-expect-error
    return { Non: null };
}

export function returnNonNullNone(): Opt<string> {
    // @ts-expect-error
    return { None: 'not null value' };
}

export function returnInvalidSomeValue(): Opt<string> {
    // @ts-expect-error
    return { Some: null };
}
