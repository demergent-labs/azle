import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt8 {
    _azleKind = 'AzleInt8' as const;
    static _azleKind = 'AzleInt8' as const;

    static tsType: int8;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Int8;
    }
}

export const int8 = AzleInt8;
export type int8 = number & { _azleKind?: 'AzleInt8' };
