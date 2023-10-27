import { Principal } from '@dfinity/principal';
import fc, { sample } from 'fast-check';
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
import { PrincipalArb } from '../reference/principal_arb';
import { Candid, CandidTypeArb } from '..';
import { BoolArb } from '../primitive/bool';
import { Float32Arb } from '../primitive/floats/float32_arb';
import { Float64Arb } from '../primitive/floats/float64_arb';
import { NullArb } from '../primitive/null';
import { TextArb } from '../primitive/text';

export type WrappedVec<Array> = {
    vec: Array;
    candidType: string;
    equalityCheck: (a: any, b: any) => boolean;
};

type ArrayMember = {};

export const VecArbOld = fc.array(fc.oneof(IntArb, Int8Arb)).map(
    (sample): WrappedVec<any> => ({
        vec: sample.map((sample) => sample.value),
        candidType: `Vec(${sample[0]?.src?.candidType ?? 'int8'})`,
        equalityCheck: (a, b) => a === b
    })
);

const VecInnerArb = (arb: fc.Arbitrary<Candid<any>>) => {
    return fc.tuple(fc.array(arb), arb).map(([sample, src]) => ({
        vec: sample.map((sample) => sample.value),
        candidType: `Vec(${src.src.candidType})`
    }));
};

// export const VecArb = fc.oneof(VecInnerArb(CandidTypeArb));
// export const VecArb = CandidTypeArb.map((sample) => VecInnerArb(sample));
export const VecArb = fc.oneof(
    // VecInnerArb(Float32Arb),
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
    VecInnerArb(TextArb)
    // VecInnerArb(NullArb)
);

// TODO look into making this recursive
// TODO we want to be able to have vecs of vecs
// TODO we need to add all constructed and reference types
// export const VecArb = fc.oneof(
//     fc.array(IntArb).map((sample) => createVecArbWrapper(sample, 'Vec(int)')),
//     fc.array(Int8Arb).map((sample) => createVecArbWrapper(sample, 'Vec(int8)')),
//     fc
//         .array(Int16Arb)
//         .map((sample) => createVecArbWrapper(sample, 'Vec(int16)')),
//     fc
//         .array(Int32Arb)
//         .map((sample) => createVecArbWrapper(sample, 'Vec(int32)')),
//     fc
//         .array(Int64Arb)
//         .map((sample) => createVecArbWrapper(sample, 'Vec(int64)')),
//     fc.array(NatArb).map((sample) => createVecArbWrapper(sample, 'Vec(nat)')),
//     fc.array(Nat8Arb).map((sample) => createVecArbWrapper(sample, 'Vec(nat8)')),
//     fc
//         .array(Nat16Arb)
//         .map((sample) => createVecArbWrapper(sample, 'Vec(nat16)')),
//     fc
//         .array(Nat32Arb)
//         .map((sample) => createVecArbWrapper(sample, 'Vec(nat32)')),
//     fc
//         .array(Nat64Arb)
//         .map((sample) => createVecArbWrapper(sample, 'Vec(nat64)')),
//     fc
//         .array(PrincipalArb)
//         .map((sample) =>
//             createVecArbWrapper(
//                 sample,
//                 'Vec(Principal)',
//                 (a: Principal, b: Principal) => a.toText() === b.toText()
//             )
//         )
// );

// function createVecArbWrapper<T extends Candid<T>[]>(
//     sample: T,
//     candidType: string,
//     equalityCheck: (a: any, b: any) => boolean = (a, b) => a === b
// ): WrappedVec<T> {
//     return {
//         vec: sample.value,
//         candidType: `Vec<${sample.src.candidType}>`,
//         equalityCheck
//     };
// }
