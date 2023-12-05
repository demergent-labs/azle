import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleNat32 {
    _azleKind: 'AzleNat32' = 'AzleNat32';
    static _azleKind: 'AzleNat32' = 'AzleNat32';

    static tsType: nat32;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Nat32;
    }
}
export const nat32 = AzleNat32;
export type nat32 = number & { _azleKind?: 'AzleNat32' };
