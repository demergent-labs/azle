import { IDL } from '@dfinity/candid';

export class AzleNat8 {
    _azleKind: 'AzleNat8' = 'AzleNat8';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Nat8;
    }
}

export const nat8: AzleNat8 = AzleNat8 as any;
export type nat8 = number;
