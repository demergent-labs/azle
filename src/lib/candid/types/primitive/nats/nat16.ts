import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleNat16 {
    _azleKind: 'AzleNat16' = 'AzleNat16';
    static _azleKind: 'AzleNat16' = 'AzleNat16';

    static tsType: nat16;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Nat16;
    }
}

export const nat16 = AzleNat16;
export type nat16 = number & { _azleKind?: 'AzleNat16' };
