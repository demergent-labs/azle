import '#experimental/build/assert_experimental';

import { CandidType } from '#experimental/lib/candid/candid_type';
import { Serializable } from '#experimental/lib/stable_structures/stable_b_tree_map';

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type NotAny<T> = IfAny<T, never, T>;

export function testCandidType<T extends CandidType>(_value: NotAny<T>): void {}
export function testSerializable<
    T extends Serializable | Partial<Serializable>
>(_value: NotAny<T>): void {}
