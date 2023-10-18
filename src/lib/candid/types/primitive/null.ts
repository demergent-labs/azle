import { IDL } from '@dfinity/candid';

export class AzleNull {
    _azleKind: 'AzleNull' = 'AzleNull';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Null;
    }
}

export const Null: AzleNull = AzleNull as any;
export type Null = null;
