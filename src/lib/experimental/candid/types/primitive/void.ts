import '../../../experimental';

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleVoid {
    _azleKind = 'AzleVoid' as const;
    static _azleKind = 'AzleVoid' as const;

    static tsType: Void;

    static toBytes(data: undefined): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): undefined {
        return decode<undefined>(this, bytes) as undefined;
    }

    static getIdlType(): IDL.Type<any> {
        return [] as unknown as IDL.Type<any>;
    }
}

export const Void = AzleVoid;
export type Void = void;
