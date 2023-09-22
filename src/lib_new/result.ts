import { RequireExactlyOne } from '../lib/candid_types/variant';
import { IDL } from './index';
import { CandidClass, Parent, toIDLType } from './utils';

export class AzleResult {
    constructor(ok: any, err: any) {
        this._azleOk = ok;
        this._azleErr = err;
    }

    _azleOk: any;
    _azleErr: any;

    getIDL(parents: Parent[]) {
        return IDL.Variant({
            Ok: toIDLType(this._azleOk, parents),
            Err: toIDLType(this._azleErr, parents)
        });
    }
}

export function Result<Ok extends CandidClass, Err extends CandidClass>(
    ok: Ok,
    err: Err
) {
    return new AzleResult(ok, err);
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
