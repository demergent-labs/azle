import { IDL } from '@dfinity/candid';
import { Parent } from './to_idl';

export interface CandidType {
    getIdl(parents: Parent[]): IDL.Type<any>;
}
