import { IDL } from '@dfinity/candid';
import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleVoid {
    _azleKind: 'AzleVoid' = 'AzleVoid';
    static _azleKind: 'AzleVoid' = 'AzleVoid';

    static tsType: Void;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl(): IDL.Type<any> {
        return [] as unknown as IDL.Type<any>;
    }
}

export const Void = AzleVoid;
export type Void = void;
