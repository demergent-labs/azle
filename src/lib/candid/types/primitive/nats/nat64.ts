import { IDL } from '@dfinity/candid';
import { decode, encode } from '../../../serde';

export class AzleNat64 {
    _kind: 'AzleNat64' = 'AzleNat64';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat64;
    }

    toBytes(data: number): Uint8Array {
        return encode(nat64, data);
    }

    fromBytes(bytes: Uint8Array): number {
        return decode(nat64, bytes);
    }
}

export const nat64: AzleNat64 = AzleNat64 as any;
export type nat64 = bigint;
