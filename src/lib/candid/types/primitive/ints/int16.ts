import { IDL } from '@dfinity/candid';

import { decode } from '../../../serde/decode';
import { encode } from '../../../serde/encode';

export class AzleInt16 {
    _azleKind = 'AzleInt16' as const;
    static _azleKind = 'AzleInt16' as const;

    static tsType: int16;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Int16;
    }
}
export const int16 = AzleInt16;
export type int16 = number & { _azleKind?: 'AzleInt16' };
