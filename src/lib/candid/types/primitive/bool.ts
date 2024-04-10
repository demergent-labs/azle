import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleBool {
    _azleKind = 'AzleBool' as const;
    static _azleKind = 'AzleBool' as const;

    static tsType: bool;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Bool;
    }
}

export const bool = AzleBool;
export type bool = boolean;
