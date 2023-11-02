import { reserved } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = reserved;
export const TestSerializable: Serializable = reserved;

type IsAny<T> = 0 extends 1 & T ? true : false;
const typeMapped = typeMapping(reserved);
export const TestTypeMapping: IsAny<typeof typeMapped> = true;
