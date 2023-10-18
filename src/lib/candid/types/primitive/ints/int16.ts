import { IDL } from '@dfinity/candid';

export class AzleInt16 {
    _azleKind: 'AzleInt16' = 'AzleInt16';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Int16;
    }
}
export const int16: AzleInt16 = AzleInt16 as any;
export type int16 = number;
