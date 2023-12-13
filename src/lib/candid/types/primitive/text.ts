import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleText {
    _azleKind: 'AzleText' = 'AzleText';
    static _azleKind: 'AzleText' = 'AzleText';

    static tsType: text;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Text;
    }
}

export const text = AzleText;
export type text = string;
