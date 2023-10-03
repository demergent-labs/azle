import { IDL } from '@dfinity/candid';

export class AzleBlob {
    _kind: 'AzleBlob' = 'AzleBlob';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Vec(IDL.Nat8);
    }
}

export const blob: AzleBlob = AzleBlob as any;
export type blob = Uint8Array;
