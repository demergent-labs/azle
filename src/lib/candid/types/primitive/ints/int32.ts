import { IDL } from '@dfinity/candid';

export class AzleInt32 {
    _azleKind: 'AzleInt32' = 'AzleInt32';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Int32;
    }
}
export const int32: AzleInt32 = AzleInt32 as any;
export type int32 = number;
