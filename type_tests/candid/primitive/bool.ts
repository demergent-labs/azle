import { bool } from 'azle';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = bool;
export const TestSerializable: Serializable = bool;
export const TestTypeMapping: boolean = typeMapping(bool);
