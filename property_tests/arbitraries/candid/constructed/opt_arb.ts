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

const InnerOptArb = (arb: fc.Arbitrary<any>) => {
    return fc
        .oneof(fc.constant('Some'), fc.constant('None'))
        .chain((keySample) => {
            return arb.map((innerValueSample) => {
                if (keySample === 'Some') {
                    return {
                        Some: innerValueSample
                    };
                } else {
                    return {
                        None: null
                    };
                }
            });
        });
};

export const { OptArb } = fc.letrec((tie) => ({
    OptArb: fc.oneof(
        InnerOptArb(tie('OptArb')).map((sample) =>
            createOptArbWrapper(sample, 'recOpt')
        ),
        InnerOptArb(IntArb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(int)')
        ),
        InnerOptArb(Int8Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(int8)')
        ),
        InnerOptArb(Int16Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(int16)')
        ),
        InnerOptArb(Int32Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(int32)')
        ),
        InnerOptArb(Int64Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(int64)')
        ),
        InnerOptArb(NatArb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(nat)')
        ),
        InnerOptArb(Nat8Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(nat8)')
        ),
        InnerOptArb(Nat16Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(nat16)')
        ),
        InnerOptArb(Nat32Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(nat32)')
        ),
        InnerOptArb(Nat64Arb).map((sample) =>
            createOptArbWrapper(sample, 'Opt(nat64)')
        )
    )
}));

// TODO look into making this recursive
// TODO we want to be able to have opts of opts
// TODO we also need to add vecs in here
// TODO we need to add all constructed and reference types
// export const OptArb = fc.oneof(
//     InnerOptArb(IntArb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(int)')
//     ),
//     InnerOptArb(Int8Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(int8)')
//     ),
//     InnerOptArb(Int16Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(int16)')
//     ),
//     InnerOptArb(Int32Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(int32)')
//     ),
//     InnerOptArb(Int64Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(int64)')
//     ),
//     InnerOptArb(NatArb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(nat)')
//     ),
//     InnerOptArb(Nat8Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(nat8)')
//     ),
//     InnerOptArb(Nat16Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(nat16)')
//     ),
//     InnerOptArb(Nat32Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(nat32)')
//     ),
//     InnerOptArb(Nat64Arb).map((sample) =>
//         createOptArbWrapper(sample, 'Opt(nat64)')
//     )
// );

function createOptArbWrapper(sample: any, candidType: string) {
    return {
        opt: sample,
        candidType
    };
}
