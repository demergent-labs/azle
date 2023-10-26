import fc from 'fast-check';
import { Candid } from '../..';

export const Nat64Arb = fc
    .bigUintN(64)
    .map((value): Candid<bigint> => ({ value, meta: { candidType: 'nat64' } }));
