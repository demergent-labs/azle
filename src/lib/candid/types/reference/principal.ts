import { IDL } from '@dfinity/candid';
import { Principal as DfinityPrincipal } from '@dfinity/principal';

import { decode } from '../../serde/decode';
import { encode } from '../../serde/encode';
import { Parent } from '../../to_idl';

export class Principal extends DfinityPrincipal {
    static _azleKind = 'Principal' as const;

    static tsType: Principal;

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl(_parents: Parent[]) {
        return IDL.Principal;
    }
}
