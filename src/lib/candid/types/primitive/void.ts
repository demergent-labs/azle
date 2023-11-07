import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleVoid {
    static _azleKind: 'AzleVoid' = 'AzleVoid';
    _azleKind: 'AzleVoid' = 'AzleVoid';

    static _azleCandidType?: '_azleCandidType';
    _azleCandidType?: '_azleCandidType';

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl() {
        return [];
    }
}

export const Void = AzleVoid;
export type Void = void;
