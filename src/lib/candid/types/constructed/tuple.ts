import { IDL } from '@dfinity/candid';

import { CandidType } from '../../candid_type';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent, toIdl } from '../../to_idl';
import { TypeMapping } from '../../type_mapping';

export class AzleTuple<T extends any[]> {
    constructor(t: CandidType[]) {
        this.innerTypes = t;
    }

    tsType: {
        [P in keyof T]: TypeMapping<T[P]>;
    } = {} as any;

    innerTypes: CandidType[];

    _azleKind = 'AzleTuple' as const;
    static _azleKind = 'AzleTuple' as const;

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
