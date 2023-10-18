import { IDL } from '@dfinity/candid';

export class AzleNat64 {
    _azleKind: 'AzleNat64' = 'AzleNat64';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Nat64;
    }
}
export const nat64: AzleNat64 = AzleNat64 as any;
export type nat64 = bigint;
