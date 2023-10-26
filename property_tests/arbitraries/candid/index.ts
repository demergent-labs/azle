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

export type Candid<T> = {
    value: T;
    type: string;
};

/**
 * An arbitrary representing all possible Candid types.
 *
 * **Note:** This currently only supports ints, nats, and null arbitraries
 */
export const CandidTypeArb = fc.oneof(
    IntArb.map((sample) => wrap(sample, 'int')),
    Int8Arb.map((sample) => wrap(sample, 'int8')),
    Int16Arb.map((sample) => wrap(sample, 'int16')),
    Int32Arb.map((sample) => wrap(sample, 'int32')),
    Int64Arb.map((sample) => wrap(sample, 'int64')),
    NatArb.map((sample) => wrap(sample, 'nat')),
    Nat8Arb.map((sample) => wrap(sample, 'nat8')),
    Nat16Arb.map((sample) => wrap(sample, 'nat16')),
    Nat32Arb.map((sample) => wrap(sample, 'nat32')),
    Nat64Arb.map((sample) => wrap(sample, 'nat64')),
    NullArb.map((sample) => wrap(sample, 'Null'))
);
// TODO: This needs to support ALL valid candid types, including records, variants, etc.

function wrap<T>(value: T, type: string): Candid<T> {
    return {
        value,
        type
    };
}
