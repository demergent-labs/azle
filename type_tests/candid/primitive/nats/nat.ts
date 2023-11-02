import { nat } from '../../../../src/lib';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = nat;
export const TestSerializable: Serializable = nat;
export const TestTypeMapping: bigint = typeMapping(nat);
