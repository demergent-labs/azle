import { blob } from 'azle';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = blob;
export const TestSerializable: Serializable = blob;
export const TestTypeMapping: Uint8Array = typeMapping(blob);
