import { IDL } from '@dfinity/candid';
import { Principal as DfinityPrincipal } from '@dfinity/principal';
import { encode } from '../../serde/encode';
import { decode } from '../../serde/decode';

export class Principal extends DfinityPrincipal {
    static _azleKind: 'Principal' = 'Principal';
    static _azleCandidType?: '_azleCandidType';

    static toBytes(data: any) {
        return encode(this, data);
    }

    static fromBytes(bytes: Uint8Array) {
        return decode(this, bytes);
    }

    static getIdl?() {
        return IDL.Principal;
    }
}
