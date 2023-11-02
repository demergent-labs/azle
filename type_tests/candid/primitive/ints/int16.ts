import { int16 } from '../../../../src/lib';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = int16;
export const TestSerializable: Serializable = int16;
export const TestTypeMapping: number = typeMapping(int16);
