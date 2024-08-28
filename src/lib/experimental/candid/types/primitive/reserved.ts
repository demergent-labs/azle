import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleReserved {
    _azleKind = 'AzleReserved' as const;
    static _azleKind = 'AzleReserved' as const;

    static tsType: reserved;

    static toBytes(data: any): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): any {
        return decode(this, bytes);
    }

    static getIdlType(): IDL.ReservedClass {
        return IDL.Reserved;
    }
}

export const reserved = AzleReserved;
export type reserved = any;
