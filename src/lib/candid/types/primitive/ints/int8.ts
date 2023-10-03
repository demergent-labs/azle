import { IDL } from '@dfinity/candid';

export class AzleInt8 {
    _kind: 'AzleInt8' = 'AzleInt8';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int8;
    }
}

export const int8: AzleInt8 = AzleInt8 as any;
export type int8 = number;
