import { Result, match, Err, Ok } from '../../lib';
import { red } from './colors';
import { AzleError } from './types';

export function isErr<T, V>(result: Result<T, V>): result is Err<V> {
    return result.hasOwnProperty('Err');
}

export function isOk<T, V>(result: Result<T, V>): result is Ok<T> {
    return result.hasOwnProperty('Ok');
}

export function mapErr<Ok, OriginalErr, NewErr>(
    result: Result<Ok, OriginalErr>,
    mapper: (err: OriginalErr) => NewErr
): Result<Ok, NewErr> {
    return match(result, {
        Ok: (okValue) => Ok<Ok, NewErr>(okValue as Ok),
        Err: (originalErrValue) => {
            const newErr = mapper(originalErrValue as OriginalErr);
            return Err<Ok, NewErr>(newErr);
        }
    });
}

export function unwrap<Ok>(result: Result<Ok, AzleError>): Ok | never {
    return match(result, {
        Ok: (okValue) => okValue as Ok,
        Err: (errValue) => exitWithError(errValue)
    });
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
