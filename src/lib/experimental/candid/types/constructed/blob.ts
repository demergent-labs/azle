import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleBlob {
    _azleKind = 'AzleBlob' as const;
    static _azleKind = 'AzleBlob' as const;

    static tsType: blob;

    static toBytes(data: blob): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): blob {
        return decode(this, bytes) as blob;
    }

    static getIdlType(): IDL.VecClass<number | bigint> {
        return IDL.Vec(IDL.Nat8);
    }
}

export const blob = AzleBlob;
export type blob = Uint8Array;
