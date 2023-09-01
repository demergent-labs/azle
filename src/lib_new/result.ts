import { RequireExactlyOne } from '../lib/candid_types/variant';
import { IDL } from './index';

export function Result<Ok extends IDL.Type, Err extends IDL.Type>(
    ok: Ok,
    err: Err
) {
    return IDL.Variant({
        Ok: ok,
        Err: err
    });
}

export type Result<Ok, Err> = RequireExactlyOne<{
    Ok: Ok;
    Err: Err;
}>;

export namespace Result {
    export function Ok<Ok>(value: Ok): Result<Ok, never> {
        return { Ok: value };
    }

    export function Err<Err>(value: Err): Result<never, Err> {
        return { Err: value };
    }
}
