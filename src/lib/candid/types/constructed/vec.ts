import { CandidType } from '../../index';
import { Parent, toIdl } from '../../index';
import { IDL } from '@dfinity/candid';

export class AzleVec<T> {
    constructor(t: any) {
        this._azleType = t;
    }

    _azleType: CandidType;
    _azleCandidType?: '_azleCandidType';

    getIDL(parents: Parent[]) {
        return IDL.Vec(toIdl(this._azleType, parents));
    }
}

export type Vec<T> = T[];
export function Vec<T>(t: T): AzleVec<T> {
    return new AzleVec(t);
}
