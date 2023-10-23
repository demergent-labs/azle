import { IDL } from '@dfinity/candid';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class AzleText {
    _azleKind: 'AzleText' = 'AzleText';
    _azleCandidType?: '_azleCandidType';

    static toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    // TODO fix all of the return types
    static fromBytes(bytes: Uint8Array): string {
        return decode(this, bytes);
    }

    static getIdl() {
        return IDL.Text;
    }
}

export const text = AzleText;
export type text = string;
