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
import { Float32Arb } from '../primitive/floats/float32_arb';
import { Float64Arb } from '../primitive/floats/float64_arb';
import { TextArb } from '../primitive/text';
import { NullArb } from '../primitive/null';
import { BoolArb } from '../primitive/bool';

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

// TODO look into making this recursive
// TODO we need to add all constructed and reference types
export const PrimitiveOptArb = fc.oneof(
    InnerOptArb(Float32Arb).map((sample) =>
        createOptArbWrapper(sample, 'float32')
    ),
    InnerOptArb(Float64Arb).map((sample) =>
        createOptArbWrapper(sample, 'float64')
    ),
    InnerOptArb(IntArb).map((sample) => createOptArbWrapper(sample, 'int')),
    InnerOptArb(Int8Arb).map((sample) => createOptArbWrapper(sample, 'int8')),
    InnerOptArb(Int16Arb).map((sample) => createOptArbWrapper(sample, 'int16')),
    InnerOptArb(Int32Arb).map((sample) => createOptArbWrapper(sample, 'int32')),
    InnerOptArb(Int64Arb).map((sample) => createOptArbWrapper(sample, 'int64')),
    InnerOptArb(NatArb).map((sample) => createOptArbWrapper(sample, 'nat')),
    InnerOptArb(Nat8Arb).map((sample) => createOptArbWrapper(sample, 'nat8')),
    InnerOptArb(Nat16Arb).map((sample) => createOptArbWrapper(sample, 'nat16')),
    InnerOptArb(Nat32Arb).map((sample) => createOptArbWrapper(sample, 'nat32')),
    InnerOptArb(Nat64Arb).map((sample) => createOptArbWrapper(sample, 'nat64')),
    InnerOptArb(BoolArb).map((sample) => createOptArbWrapper(sample, 'bool')),
    InnerOptArb(TextArb).map((sample) => createOptArbWrapper(sample, 'text')),
    InnerOptArb(NullArb).map((sample) => createOptArbWrapper(sample, 'Null'))
);

export type OptArb = {
    candidType: string;
    azleValue: AzleOpt;
    agentValue: AgentOpt;
};
type OptWrapper = { opt: any; candidType: string };
type RecursiveOpt = { base: OptWrapper; nextLayer: RecursiveOpt | null };
type AzleOpt = { Some?: any; None?: null };
type AgentOpt = [any] | [];

function createOptArbWrapper(sample: any, candidType: string): OptWrapper {
    return {
        opt: sample,
        candidType
    };
}

export const { RecursiveOptArb } = fc.letrec((tie) => ({
    RecursiveOptArb: fc.record({
        base: PrimitiveOptArb,
        nextLayer: fc.option(tie('OptRecordArb'), { maxDepth: 3 })
    })
}));

export const OptArb = RecursiveOptArb.map((recursiveOptArb) => {
    const optArb = recursiveOptArb as RecursiveOpt;
    return {
        candidType: createCandidTypeFromRecursiveOpt(optArb),
        azleValue: createCandidValueFromRecursiveOpt(optArb),
        agentValue: createAgentValueFromRecursiveOpt(optArb)
    };
});

function createCandidTypeFromRecursiveOpt(RecursiveOpt: RecursiveOpt): string {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        return `Opt(${RecursiveOpt.base.candidType})`;
    } else {
        return `Opt(${createCandidTypeFromRecursiveOpt(
            RecursiveOpt.nextLayer
        )})`;
    }
}

function createAgentValueFromRecursiveOpt(
    RecursiveOpt: RecursiveOpt
): AgentOpt {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        if (RecursiveOpt.base.opt && RecursiveOpt.base.opt.Some !== undefined) {
            return [RecursiveOpt.base.opt.Some];
        } else {
            return [];
        }
    } else {
        return [createAgentValueFromRecursiveOpt(RecursiveOpt.nextLayer)];
    }
}

function createCandidValueFromRecursiveOpt(
    RecursiveOpt: RecursiveOpt
): AzleOpt {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        if (RecursiveOpt.base.opt && RecursiveOpt.base.opt.Some !== undefined) {
            return { Some: RecursiveOpt.base.opt.Some };
        } else {
            return { None: null };
        }
    } else {
        return {
            Some: createCandidValueFromRecursiveOpt(RecursiveOpt.nextLayer)
        };
    }
}
