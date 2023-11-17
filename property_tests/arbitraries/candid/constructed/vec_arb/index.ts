import fc from 'fast-check';
import { IntArb } from '../../primitive/ints/int_arb';
import { Int8Arb } from '../../primitive/ints/int8_arb';
import { Int16Arb } from '../../primitive/ints/int16_arb';
import { Int32Arb } from '../../primitive/ints/int32_arb';
import { Int64Arb } from '../../primitive/ints/int64_arb';
import { NatArb } from '../../primitive/nats/nat_arb';
import { Nat8Arb } from '../../primitive/nats/nat8_arb';
import { Nat16Arb } from '../../primitive/nats/nat16_arb';
import { Nat32Arb } from '../../primitive/nats/nat32_arb';
import { Nat64Arb } from '../../primitive/nats/nat64_arb';
import { PrincipalArb } from '../../reference/principal_arb';
import { BoolArb } from '../../primitive/bool';
import { Float32Arb } from '../../primitive/floats/float32_arb';
import { Float64Arb } from '../../primitive/floats/float64_arb';
import { NullArb } from '../../primitive/null';
import { TextArb } from '../../primitive/text';
import { BlobArb } from '../blob_arb';
import { VecInnerArb } from './base';

export type Vec<T> =
    | T[]
    | Uint16Array
    | Uint32Array
    | Uint8Array
    | Int16Array
    | Int32Array
    | Int8Array
    | BigUint64Array
    | BigInt64Array;

export const VecArb = fc.oneof(
    VecInnerArb(Float32Arb),
    VecInnerArb(Float64Arb),
    VecInnerArb(IntArb),
    VecInnerArb(Int8Arb),
    VecInnerArb(Int16Arb),
    VecInnerArb(Int32Arb),
    VecInnerArb(Int64Arb),
    VecInnerArb(NatArb),
    VecInnerArb(Nat8Arb),
    VecInnerArb(Nat16Arb),
    VecInnerArb(Nat32Arb),
    VecInnerArb(Nat64Arb),
    VecInnerArb(BoolArb),
    VecInnerArb(TextArb),
    VecInnerArb(PrincipalArb),
    VecInnerArb(BlobArb)
    // VecInnerArb(NullArb)
);
