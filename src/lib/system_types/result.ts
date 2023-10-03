import { Parent, toIDLType, CandidType } from '../candid';
import { RequireExactlyOne } from '../candid/types/constructed/variant';
import { IDL } from '@dfinity/candid';

export class AzleResult<T, K> {
    constructor(ok: any, err: any) {
        this._azleOk = ok;
        this._azleErr = err;
    }

    _azleOk: any;
    _azleErr: any;

    _azleCandidType?: '_azleCandidType';

    getIDL(parents: Parent[]) {
        return IDL.Variant({
            Ok: toIDLType(this._azleOk, parents),
            Err: toIDLType(this._azleErr, parents)
        });
    }
}

export function Result<Ok extends CandidType, Err extends CandidType>(
    ok: Ok,
    err: Err
) {
    return new AzleResult<Ok, Err>(ok, err);
}

export type Result<Ok, Err> = RequireExactlyOne<{
    Ok: Ok;
    Err: Err;
}>;

export namespace Result {
    export function Ok<T>(value: T) {
        return { Ok: value };
    }

    export function Err<T>(value: T) {
        return { Err: value };
    }
}

export function Ok<T>(value: T) {
    return { Ok: value };
}

export function Err<T>(value: T) {
    return { Err: value };
}
