import { IDL } from '@dfinity/candid';

export class AzleNat {
    _azleKind: 'AzleNat' = 'AzleNat';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Nat;
    }
}

export const nat: AzleNat = AzleNat as any;
export type nat = bigint;
