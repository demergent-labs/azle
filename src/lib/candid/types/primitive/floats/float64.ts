import { IDL } from '@dfinity/candid';

export class AzleFloat64 {
    _kind: 'AzleFloat64' = 'AzleFloat64';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Float64;
    }
}

export const float64: AzleFloat64 = AzleFloat64 as any;
export type float64 = number;
