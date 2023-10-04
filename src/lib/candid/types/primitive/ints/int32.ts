import { IDL } from '@dfinity/candid';

export class AzleInt32 {
    _kind: 'AzleInt32' = 'AzleInt32';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int32;
    }
}
export const int32: AzleInt32 = AzleInt32 as any;
export type int32 = number;
