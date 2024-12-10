import '../../../experimental';

import { IDL } from '@dfinity/candid';

export class AzleEmpty {
    _azleKind = 'AzleEmpty' as const;
    static _azleKind = 'AzleEmpty' as const;

    static tsType: empty;

    static getIdlType(): IDL.EmptyClass {
        return IDL.Empty;
    }
}

export const empty = AzleEmpty;
export type empty = never;
