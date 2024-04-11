import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleNull {
    _azleKind = 'AzleNull' as const;
    static _azleKind = 'AzleNull' as const;

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
