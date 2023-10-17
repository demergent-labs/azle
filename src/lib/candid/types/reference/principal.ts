import { IDL } from '@dfinity/candid';
import { Principal as DfinityPrincipal } from '@dfinity/principal';

export class Principal extends DfinityPrincipal {
    static _azleCandidType?: '_azleCandidType';

    static getIdl?() {
        return IDL.Principal;
    }
}
