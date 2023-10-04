import { CandidType } from '../../index';
import { Parent, toIDLType } from '../../index';
import { IDL } from '@dfinity/candid';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this._azleTypes = t;
    }

    _azleTypes: CandidType[];
    _azleCandidType?: '_azleCandidType';

    getIDL(parents: Parent[]) {
        const candidTypes = this._azleTypes.map((value) => {
            return toIDLType(value, parents);
        });
        return IDL.Tuple(...candidTypes);
    }
}

export function Tuple<T extends any[]>(...types: T): AzleTuple<T> {
    return new AzleTuple(types);
}
export type Tuple<T> = T;
