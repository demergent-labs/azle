import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleEmpty {
    _azleKind = 'AzleEmpty' as const;
    static _azleKind = 'AzleEmpty' as const;

    static tsType: empty;

    static toBytes(data: empty): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): empty {
        return decode<empty>(this, bytes) as empty;
    }

    static getIdlType(): IDL.EmptyClass {
        return IDL.Empty;
    }
}

export const empty = AzleEmpty;
export type empty = never;
