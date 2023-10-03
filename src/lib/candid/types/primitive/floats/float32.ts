import { IDL } from '@dfinity/candid';

export class AzleFloat32 {
    _kind: 'AzleFloat32' = 'AzleFloat32';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Float32;
    }
}

export const float32: AzleFloat32 = AzleFloat32 as any;
export type float32 = number;
