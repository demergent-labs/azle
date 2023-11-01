import fc from 'fast-check';
import { IntArb } from './primitive/ints/int_arb';
import { Int8Arb } from './primitive/ints/int8_arb';
import { Int16Arb } from './primitive/ints/int16_arb';
import { Int32Arb } from './primitive/ints/int32_arb';
import { Int64Arb } from './primitive/ints/int64_arb';
import { NatArb } from './primitive/nats/nat_arb';
import { Nat8Arb } from './primitive/nats/nat8_arb';
import { Nat16Arb } from './primitive/nats/nat16_arb';
import { Nat32Arb } from './primitive/nats/nat32_arb';
import { Nat64Arb } from './primitive/nats/nat64_arb';
import { NullArb } from './primitive/null';

// TODO we're thinking that Candid is not the best name for this. What is better?
export type Candid<T> = {
    value: T;
    src: {
        candidType: string;
        typeDeclaration?: string;
        imports: Set<string>;
        valueLiteral: string;
    };
    equals(a: T, b: T): boolean;
};

export type CandidType = number | bigint | null;

/**
 * An arbitrary representing all possible Candid types.
 *
 * **Note:** This currently only supports ints, nats, and null arbitraries
 */
export const CandidTypeArb = fc.oneof(
    IntArb,
    Int8Arb,
    Int16Arb,
    Int32Arb,
    Int64Arb,
    NatArb,
    Nat8Arb,
    Nat16Arb,
    Nat32Arb,
    Nat64Arb,
    NullArb
);
// TODO: This needs to support ALL valid candid types, including records, variants, etc.
