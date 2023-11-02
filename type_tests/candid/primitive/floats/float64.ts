import { float64 } from 'azle';
import { CandidType } from '../../../../src/lib/candid/candid_type';
import { Serializable } from '../../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../../..';

export const TestCandidType: CandidType = float64;
export const TestSerializable: Serializable = float64;
export const TestTypeMapping: number = typeMapping(float64);
