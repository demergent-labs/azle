import { Void } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = Void;
export const TestSerializable: Serializable = Void;
export const TestTypeMapping: void = typeMapping(Void);
