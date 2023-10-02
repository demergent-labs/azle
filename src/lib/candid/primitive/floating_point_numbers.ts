import { IDL } from '../..';

export class AzleFloat64 {
    _kind: 'AzleFloat64' = 'AzleFloat64';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Float64;
    }
}

export class AzleFloat32 {
    _kind: 'AzleFloat32' = 'AzleFloat32';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Float32;
    }
}

export const float32: AzleFloat32 = AzleFloat32 as any;
export type float32 = number;
export const float64: AzleFloat64 = AzleFloat64 as any;
export type float64 = number;
