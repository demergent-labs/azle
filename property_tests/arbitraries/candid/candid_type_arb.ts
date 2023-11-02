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
import { BoolArb } from './primitive/bool';
import { Principal } from '@dfinity/principal';
import { PrincipalArb } from './reference/principal_arb';
import { Float32Arb } from './primitive/floats/float32_arb';
import { Float64Arb } from './primitive/floats/float64_arb';
import { TextArb } from './primitive/text';
import { BlobArb } from './constructed/blob_arb';
import { Candid } from './candid_arb';
import { Func } from './reference/func_arb';
import { Opt } from './constructed/opt_arb';

export type CandidType =
    | number
    | bigint
    | null
    | boolean
    | Principal
    | Uint8Array
    | string
    | Func
    | Opt;

/**
 * An arbitrary representing all possible Candid types.
 *
 * **Note:** This currently only supports ints, nats, and null arbitraries
 */
export const CandidTypeArb: fc.Arbitrary<Candid<CandidType>> = fc.oneof(
    Float32Arb,
    Float64Arb,
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
    BoolArb,
    NullArb,
    TextArb,
    PrincipalArb,
    BlobArb
);
// TODO: This needs to support ALL valid candid types, including records, variants, etc.
