import { IDL } from '@dfinity/candid';

export class AzleNat32 {
    _azleKind: 'AzleNat32' = 'AzleNat32';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Nat32;
    }
}
export const nat32: AzleNat32 = AzleNat32 as any;
export type nat32 = number;
