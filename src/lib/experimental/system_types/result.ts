import '../experimental';

import { IDL } from '@dfinity/candid';

import { CandidType } from '../candid/candid_type';
import { Parent, toIdlType } from '../candid/to_idl_type';
import { RequireExactlyOne } from '../candid/types/constructed/variant';

export class AzleResult<T extends CandidType, K extends CandidType> {
    constructor(ok: T, err: K) {
        this.Ok = ok;
        this.Err = err;
    }

    Ok: T;
    Err: K;

    getIdlType(parents: Parent[]): IDL.VariantClass {
        return IDL.Variant({
            Ok: toIdlType(this.Ok, parents),
            Err: toIdlType(this.Err, parents)
        });
    }
}

export function Result<Ok extends CandidType, Err extends CandidType>(
    ok: Ok,
    err: Err
): AzleResult<Ok, Err> {
    return new AzleResult<Ok, Err>(ok, err);
}

export type Result<Ok, Err> = RequireExactlyOne<{
    Ok: Ok;
    Err: Err;
}>;

// Using a namespace is the only way we can see to get Result exported as:
// - a type
// - a function
// - a namespace for the Ok and Err functions
//
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Result {
    export function Ok<T>(value: T): Result<T, any> {
        return { Ok: value };
    }

    export function Err<T>(value: T): Result<any, T> {
        return { Err: value };
    }
}

export function Ok<T>(value: T): Result<T, any> {
    return { Ok: value };
}

export function Err<T>(value: T): Result<any, T> {
    return { Err: value };
}
