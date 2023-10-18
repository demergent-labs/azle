import { IDL } from '@dfinity/candid';

export class AzleEmpty {
    _azleKind: 'AzleEmpty' = 'AzleEmpty';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Empty;
    }
}

export const empty: AzleEmpty = AzleEmpty as any;
export type empty = never;
