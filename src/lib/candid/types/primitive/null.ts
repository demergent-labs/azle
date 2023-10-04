import { IDL } from '@dfinity/candid';

export class AzleNull {
    _kind: 'AzleNull' = 'AzleNull';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Null;
    }
}

export const Null: AzleNull = AzleNull as any;
export type Null = null;
