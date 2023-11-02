import { Null } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = Null;
export const TestSerializable: Serializable = Null;
export const TestTypeMapping: null = typeMapping(Null);
