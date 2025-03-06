import '#experimental/lib/experimental';

import { IDL } from '@dfinity/candid';

import { Parent } from './to_idl_type';

/**
 * @deprecated since Azle v0.26.0 - this will be removed in a future major release.
 * Please use alternative functionality exported directly from `azle`.
 */
export interface CandidType {
    getIdlType(parents: Parent[]): IDL.Type<any>;
}
