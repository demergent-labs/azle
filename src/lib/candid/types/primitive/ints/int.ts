import { IDL } from '@dfinity/candid';

export class AzleInt {
    _kind: 'AzleInt' = 'AzleInt';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Int;
    }
}

export const int: AzleInt = AzleInt as any;
export type int = bigint;
