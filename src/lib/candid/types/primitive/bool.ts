import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleBool {
    _azleKind: 'AzleBool' = 'AzleBool';
    static _azleKind: 'AzleBool' = 'AzleBool';

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
