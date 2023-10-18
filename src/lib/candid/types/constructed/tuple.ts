import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';
import { IDL } from '@dfinity/candid';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this.innerTypes = t;
    }

    innerTypes: CandidType[];
    _azleCandidType?: '_azleCandidType';

    getIdl(parents: Parent[]) {
        const idls = this.innerTypes.map((value) => {
            return toIdl(value, parents);
        });
        return IDL.Tuple(...idls);
    }
}

export function Tuple<T extends any[]>(...types: T): AzleTuple<T> {
    return new AzleTuple(types);
}
export type Tuple<T> = T;
