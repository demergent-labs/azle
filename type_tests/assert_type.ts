import { CandidType } from '../src/lib/candid/candid_type';
import { Serializable } from '../src/lib/stable_structures/stable_b_tree_map';

export type IsAny<T> = 0 extends 1 & T ? true : false;
export type IsExact<T, U> = [T] extends [U]
    ? [U] extends [T]
        ? true
        : false
    : false;
export type NotAnyAndExact<T, U> = IsAny<T> extends true
    ? false
    : IsExact<T, U>;
export type AssertType<T extends true> = T;

type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type NotAny<T> = IfAny<T, never, T>;

export function testCandidType<T extends CandidType>(value: NotAny<T>) {}
export function testSerializable<
    T extends Serializable | Partial<Serializable>
>(value: NotAny<T>) {}
