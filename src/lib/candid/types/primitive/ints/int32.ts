import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleInt32 {
    _azleKind: 'AzleInt32' = 'AzleInt32';
    static _azleKind: 'AzleInt32' = 'AzleInt32';

    static tsType: int32;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Int32;
    }
}
export const int32 = AzleInt32;
export type int32 = number & { _azleKind?: 'AzleInt32' };
