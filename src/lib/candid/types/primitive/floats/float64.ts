import { IDL } from '@dfinity/candid';

export class AzleFloat64 {
    _azleKind: 'AzleFloat64' = 'AzleFloat64';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Float64;
    }
}

export const float64: AzleFloat64 = AzleFloat64 as any;
export type float64 = number;
