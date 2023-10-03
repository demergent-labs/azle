import { IDL } from '@dfinity/candid';

export class AzleText {
    _kind: 'AzleText' = 'AzleText';
    _azleCandidType?: '_azleCandidType';

    static getIDL() {
        return IDL.Text;
    }
}

export const text: AzleText = AzleText as any;
export type text = string;
