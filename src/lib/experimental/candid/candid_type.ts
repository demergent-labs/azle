import '../experimental';

import { IDL } from '@dfinity/candid';

import { Parent } from './to_idl_type';

export interface CandidType {
    getIdlType(parents: Parent[]): IDL.Type<any>;
}
