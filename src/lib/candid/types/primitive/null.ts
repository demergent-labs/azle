import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleNull {
    _azleKind: 'AzleNull' = 'AzleNull';
    static _azleKind: 'AzleNull' = 'AzleNull';

    static tsType: Null;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Null;
    }
}

export const Null = AzleNull;
export type Null = null;
