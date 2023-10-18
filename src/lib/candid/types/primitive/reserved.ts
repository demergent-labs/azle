import { IDL } from '@dfinity/candid';

export class AzleReserved {
    _azleKind: 'AzleReserved' = 'AzleReserved';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Reserved;
    }
}

export const reserved: AzleReserved = AzleReserved as any;
export type reserved = any;
