import { IDL } from '../idl_export';
import { Parent } from './to_idl';

export interface CandidType {
    getIdl(parents: Parent[]): IDL.Type<any>;
}
