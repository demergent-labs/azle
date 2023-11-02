import { empty } from '../../../src/lib';
import { CandidType } from '../../../src/lib/candid/candid_type';
import { Serializable } from '../../../src/lib/stable_b_tree_map';
import { typeMapping } from '../..';

export const TestCandidType: CandidType = empty;
export const TestSerializable: Serializable = empty;

type IsNever<T> = [T] extends [never] ? true : false;
const typeMapped = typeMapping(empty);
export const TestTypeMapping: IsNever<typeof typeMapped> = true;
