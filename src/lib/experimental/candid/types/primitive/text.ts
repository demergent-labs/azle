import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleText {
    _azleKind = 'AzleText' as const;
    static _azleKind = 'AzleText' as const;

    static tsType: text;

    static toBytes(data: string): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): string {
        return decode<string>(this, bytes) as string;
    }

    static getIdlType(): IDL.TextClass {
        return IDL.Text;
    }
}

export const text = AzleText;
export type text = string;
