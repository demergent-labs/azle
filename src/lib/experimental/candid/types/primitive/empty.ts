import '../../../experimental';

import { IDL } from '@dfinity/candid';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export class AzleEmpty {
    _azleKind = 'AzleEmpty' as const;
    static _azleKind = 'AzleEmpty' as const;

    static tsType: empty;

    static getIdlType(): IDL.EmptyClass {
        return IDL.Empty;
    }
}

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export const empty = AzleEmpty;
export type empty = never;
