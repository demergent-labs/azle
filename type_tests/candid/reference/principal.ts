import { Principal } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = Principal;
export const TestSerializable: Serializable = Principal;
export const TestTypeMapping: Principal = typeMapping(Principal);
