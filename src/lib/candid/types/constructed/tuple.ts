import { CandidType } from '../../index';
import { Parent, toIdl } from '../../index';
import { IDL } from '@dfinity/candid';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this._azleTypes = t;
    }

    _azleTypes: CandidType[];
    _azleCandidType?: '_azleCandidType';

    getIdl(parents: Parent[]) {
        const idls = this._azleTypes.map((value) => {
            return toIdl(value, parents);
        });
        return IDL.Tuple(...idls);
    }
}

export function Tuple<T extends any[]>(...types: T): AzleTuple<T> {
    return new AzleTuple(types);
}
export type Tuple<T> = T;
