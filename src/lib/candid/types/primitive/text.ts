import { IDL } from '@dfinity/candid';

export class AzleText {
    _azleKind: 'AzleText' = 'AzleText';
    _azleCandidType?: '_azleCandidType';

    static getIdl() {
        return IDL.Text;
    }
}

export const text: AzleText = AzleText as any;
export type text = string;
