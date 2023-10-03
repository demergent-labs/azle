import { IDL } from '@dfinity/candid';

export class AzleInt16 {
    _kind: 'AzleInt16' = 'AzleInt16';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int16;
    }
}
export const int16: AzleInt16 = AzleInt16 as any;
export type int16 = number;
