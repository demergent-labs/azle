import { text } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = text;
export const TestSerializable: Serializable = text;
export const TestTypeMapping: string = typeMapping(text);
