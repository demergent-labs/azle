import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleVoid {
    _azleKind: 'AzleVoid' = 'AzleVoid';
    _azleCandidType?: '_azleCandidType';

    static toBytes(data: number): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): number {
        return decode(this, bytes);
    }

    static getIdl() {
        return [];
    }
}

export const Void = AzleVoid;
export type Void = void;
