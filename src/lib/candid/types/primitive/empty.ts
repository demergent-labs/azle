import { IDL } from '@dfinity/candid';

export class AzleEmpty {
    _kind: 'AzleEmpty' = 'AzleEmpty';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Empty;
    }
}

export const empty: AzleEmpty = AzleEmpty as any;
export type empty = never;
