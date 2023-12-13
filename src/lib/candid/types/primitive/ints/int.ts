import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleInt {
    _azleKind: 'AzleInt' = 'AzleInt';
    static _azleKind: 'AzleInt' = 'AzleInt';

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
