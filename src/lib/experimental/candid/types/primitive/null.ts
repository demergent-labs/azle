import { experimentalMessage } from '../../../experimental';

if (globalThis._azleExperimental !== true) {
    throw new Error(experimentalMessage('azle/experimental'));
}

import { IDL } from '@dfinity/candid';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';

export class AzleNull {
    _azleKind = 'AzleNull' as const;
    static _azleKind = 'AzleNull' as const;

    static tsType: Null;

    static toBytes(data: Null): Uint8Array {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array): Null {
        return decode<Null>(this, bytes) as Null;
    }

    static getIdlType(): IDL.NullClass {
        return IDL.Null;
    }
}

export const Null = AzleNull;
export type Null = null;
