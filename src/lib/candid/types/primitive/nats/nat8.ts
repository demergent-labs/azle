import { IDL } from '@dfinity/candid';

export class AzleNat8 {
    _kind: 'AzleNat8' = 'AzleNat8';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat8;
    }
}

export const nat8: AzleNat8 = AzleNat8 as any;
export type nat8 = number;
