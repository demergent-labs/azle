import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleReserved {
    _azleKind: 'AzleReserved' = 'AzleReserved';
    _azleCandidType?: '_azleCandidType';

    static _azleKind: 'AzleReserved' = 'AzleReserved';
    static _azleCandidType?: '_azleCandidType';

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Reserved;
    }
}

export const reserved = AzleReserved;
export type reserved = any;
