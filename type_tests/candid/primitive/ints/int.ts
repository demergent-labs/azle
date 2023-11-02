import { int } from '../../../../src/lib';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = int;
export const TestSerializable: Serializable = int;
export const TestTypeMapping: bigint = typeMapping(int);
