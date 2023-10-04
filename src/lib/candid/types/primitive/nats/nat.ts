import { IDL } from '@dfinity/candid';

export class AzleNat {
    _kind: 'AzleNat' = 'AzleNat';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat;
    }
}

export const nat: AzleNat = AzleNat as any;
export type nat = bigint;
