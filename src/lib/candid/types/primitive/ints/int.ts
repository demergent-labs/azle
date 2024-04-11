import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt {
    _azleKind = 'AzleInt' as const;
    static _azleKind = 'AzleInt' as const;

    static tsType: int;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Int;
    }
}

export const int = AzleInt;
export type int = bigint;
