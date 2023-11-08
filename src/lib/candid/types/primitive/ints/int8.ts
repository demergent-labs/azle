import { IDL } from '@dfinity/candid';
import { encode } from '../../../serde/encode';
import { decode } from '../../../serde/decode';

export class AzleInt8 {
    _azleKind: 'AzleInt8' = 'AzleInt8';
    _azleCandidType?: '_azleCandidType';

    static _azleKind: 'AzleInt8' = 'AzleInt8';
    static _azleCandidType?: '_azleCandidType';

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Int8;
    }
}

export const int8 = AzleInt8;
export type int8 = number & { _azleKind?: 'AzleInt8' };
