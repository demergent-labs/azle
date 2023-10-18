import { CandidType } from '../candid/candid_type';
import { Parent, toIdl } from '../candid/to_idl';
import { RequireExactlyOne } from '../candid/types/constructed/variant';
import { IDL } from '@dfinity/candid';

export class AzleResult<T extends CandidType, K extends CandidType> {
    constructor(ok: T, err: K) {
        this.Ok = ok;
        this.Err = err;
    }

    Ok: T;
    Err: K;

    _azleCandidType?: '_azleCandidType';

    getIdl(parents: Parent[]) {
        return IDL.Variant({
            Ok: toIdl(this.Ok, parents),
            Err: toIdl(this.Err, parents)
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
