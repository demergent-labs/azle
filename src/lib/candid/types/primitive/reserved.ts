import { IDL } from '@dfinity/candid';

export class AzleReserved {
    _kind: 'AzleReserved' = 'AzleReserved';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Reserved;
    }
}

export const reserved: AzleReserved = AzleReserved as any;
export type reserved = any;
