import { float32 } from '../../../../src/lib';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = float32;
export const TestSerializable: Serializable = float32;
export const TestTypeMapping: number = typeMapping(float32);
