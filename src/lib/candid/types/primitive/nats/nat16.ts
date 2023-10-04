import { IDL } from '@dfinity/candid';

export class AzleNat16 {
    _kind: 'AzleNat16' = 'AzleNat16';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Nat16;
    }
}

export const nat16: AzleNat16 = AzleNat16 as any;
export type nat16 = number;
