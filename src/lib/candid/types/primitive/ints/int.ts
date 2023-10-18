import { IDL } from '@dfinity/candid';

export class AzleInt {
    _azleKind: 'AzleInt' = 'AzleInt';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Int;
    }
}

export const int: AzleInt = AzleInt as any;
export type int = bigint;
