import fc from 'fast-check';
import { IntArb } from '../primitive/ints/int_arb';
import { Int8Arb } from '../primitive/ints/int8_arb';
import { Int16Arb } from '../primitive/ints/int16_arb';
import { Int32Arb } from '../primitive/ints/int32_arb';
import { Int64Arb } from '../primitive/ints/int64_arb';
import { NatArb } from '../primitive/nats/nat_arb';
import { Nat8Arb } from '../primitive/nats/nat8_arb';
import { Nat16Arb } from '../primitive/nats/nat16_arb';
import { Nat32Arb } from '../primitive/nats/nat32_arb';
import { Nat64Arb } from '../primitive/nats/nat64_arb';

// TODO look into making this recursive
// TODO we want to be able to have vecs of vecs
// TODO we need to add all constructed and reference types
export const VecArb = fc.oneof(
    fc.array(IntArb).map((sample) => createVecArbWrapper(sample, 'Vec(int)')),
    fc.array(Int8Arb).map((sample) => createVecArbWrapper(sample, 'Vec(int8)')),
    fc
        .array(Int16Arb)
        .map((sample) => createVecArbWrapper(sample, 'Vec(int16)')),
    fc
        .array(Int32Arb)
        .map((sample) => createVecArbWrapper(sample, 'Vec(int32)')),
    fc
        .array(Int64Arb)
        .map((sample) => createVecArbWrapper(sample, 'Vec(int64)')),
    fc.array(NatArb).map((sample) => createVecArbWrapper(sample, 'Vec(nat)')),
    fc.array(Nat8Arb).map((sample) => createVecArbWrapper(sample, 'Vec(nat8)')),
    fc
        .array(Nat16Arb)
        .map((sample) => createVecArbWrapper(sample, 'Vec(nat16)')),
    fc
        .array(Nat32Arb)
        .map((sample) => createVecArbWrapper(sample, 'Vec(nat32)')),
    fc
        .array(Nat64Arb)
        .map((sample) => createVecArbWrapper(sample, 'Vec(nat64)'))
);

function createVecArbWrapper(sample: any[], candidType: string) {
    return {
        vec: sample,
        candidType
    };
}
