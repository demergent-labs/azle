import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleBool {
    _azleKind: 'AzleBool' = 'AzleBool';
    _azleCandidType?: '_azleCandidType';

    static toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): number {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Bool;
    }
}

export const bool = AzleBool;
export type bool = boolean;
