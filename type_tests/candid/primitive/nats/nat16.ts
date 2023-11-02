import { nat16 } from '../../../../src/lib';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = nat16;
export const TestSerializable: Serializable = nat16;
export const TestTypeMapping: number = typeMapping(nat16);
