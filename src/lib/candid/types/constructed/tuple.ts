import { CandidType } from '../../candid_type';
import { Parent, toIdl } from '../../to_idl';
import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';
import { TypeMapping } from '../../type_mapping';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this.innerTypes = t;
    }

    tsType: {
        [P in keyof T]: TypeMapping<T[P]>;
    } = {} as any;

    innerTypes: CandidType[];

    _azleKind: 'AzleTuple' = 'AzleTuple';
    static _azleKind: 'AzleTuple' = 'AzleTuple';

    toBytes(data: any) {
        return encode(this, data);
    }

    fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    getIdl(parents: Parent[]) {
        const idls = this.innerTypes.map((value) => {
            return toIdl(value, parents);
        });
        return IDL.Tuple(...idls);
    }
}

export function Tuple<T extends CandidType[]>(...types: T) {
    return new AzleTuple<T>(types);
}
export type Tuple<T> = T;
