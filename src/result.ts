import { red } from './colors';
import { AzleError } from './types';

export type Ok<T> = {
    ok: T;
};

export type Err<T> = {
    err: T;
};

export type Result<Ok, Err> = Partial<{
    ok: Ok;
    err: Err;
}>;

export function ok<T, V>(result: Result<T, V>): result is Ok<T> {
    return result.err === undefined;
}

export function unwrap<Ok>(result: Result<Ok, AzleError>): Ok | never {
    if (!ok(result)) {
        const err = result.err as NonNullable<typeof result.err>;
        exitWithError(err);
    }
    return result.ok;
}

export function Err<T>(err: T): Err<T> {
    return { err };
}

export function Ok<T>(ok: T): Ok<T> {
    return { ok };
}

function exitWithError(payload: AzleError): never {
    if (payload.error) {
        console.error(`\n💣 ${red(payload.error)}`);
    }
    if (payload.suggestion) {
        console.error(`\n${payload.suggestion}`);
    }
    console.log(`\n💀 Build failed`);
    process.exit(payload.exitCode ?? 0);
}
