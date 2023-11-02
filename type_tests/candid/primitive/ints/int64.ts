import { int64 } from '../../../../src/lib';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = int64;
export const TestSerializable: Serializable = int64;
export const TestTypeMapping: bigint = typeMapping(int64);
