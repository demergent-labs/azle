import { IDL } from '@dfinity/candid';
import { decode, encode } from '../../../serde';

export class AzleNat8 {
    _kind: 'AzleNat8' = 'AzleNat8';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat8;
    }

    toBytes(data: number): Uint8Array {
        return encode(nat8, data);
    }

    fromBytes(bytes: Uint8Array): number {
        return decode(nat8, bytes);
    }
}

export const nat8: AzleNat8 = AzleNat8 as any;
export type nat8 = number;
