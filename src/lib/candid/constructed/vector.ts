import { CandidType } from '..';
import { IDL, Parent, toIDLType } from '../..';

export class AzleVec<T> {
    constructor(t: any) {
        this._azleType = t;
    }

    _azleType: CandidType;
    _azleCandidType?: '_azleCandidType';

    getIDL(parents: Parent[]) {
        return IDL.Vec(toIDLType(this._azleType, parents));
    }
}

export type Vec<T> = T[];
export function Vec<T>(t: T): AzleVec<T> {
    // return IDL.Vec(toCandidClass(t));
    return new AzleVec(t);
}
