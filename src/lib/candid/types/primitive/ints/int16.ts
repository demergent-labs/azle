import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleInt16 {
    _azleKind: 'AzleInt16' = 'AzleInt16';
    _azleCandidType?: '_azleCandidType';

    static toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): number {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Int16;
    }
}
export const int16 = AzleInt16;
export type int16 = number;
