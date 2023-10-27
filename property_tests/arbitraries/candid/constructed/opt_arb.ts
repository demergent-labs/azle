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
import { Candid } from '../../candid';

const InnerOptArb = (arb: fc.Arbitrary<Candid<any>>) => {
    return fc
        .oneof(fc.constant('Some'), fc.constant('None'))
        .chain((keySample) => {
            return arb.map((innerValueSample): CandidSampleOpt<any> => {
                if (keySample === 'Some') {
                    return {
                        Some: innerValueSample,
                        src: {
                            candidType: `Opt(${innerValueSample.src.candidType})`,
                            imports: innerValueSample.src.imports.add('Opt')
                        }
                    };
                } else {
                    return {
                        None: null,
                        src: {
                            candidType: `Opt(${innerValueSample.src.candidType})`,
                            imports: innerValueSample.src.imports.add('Opt')
                        }
                    };
                }
            });
        });
};

// TODO look into making this recursive
// TODO we need to add all constructed and reference types
export const PrimitiveOptArb = fc.oneof(
    InnerOptArb(Float32Arb),
    InnerOptArb(Float64Arb),
    InnerOptArb(IntArb),
    InnerOptArb(Int8Arb),
    InnerOptArb(Int16Arb),
    InnerOptArb(Int32Arb),
    InnerOptArb(Int64Arb),
    InnerOptArb(NatArb),
    InnerOptArb(Nat8Arb),
    InnerOptArb(Nat16Arb),
    InnerOptArb(Nat32Arb),
    InnerOptArb(Nat64Arb),
    InnerOptArb(BoolArb),
    InnerOptArb(TextArb),
    InnerOptArb(NullArb)
);

export type Opt = {
    azle: AzleOpt<any>;
    agent: AgentOpt;
};

type RecursiveOpt<T> = {
    base: CandidSampleOpt<Candid<T>>;
    nextLayer: RecursiveOpt<T> | null;
};
type AzleOpt<T> = { Some?: T; None?: null };
type CandidSampleOpt<T> = {
    Some?: T;
    None?: any;
    src: { candidType: string; imports: Set<string> };
};

type AgentOpt = [any] | [];

export const OptArb = fc
    .letrec((tie) => ({
        RecursiveOptArb: fc.record({
            base: PrimitiveOptArb,
            nextLayer: fc.option(tie('RecursiveOptArb'), { maxDepth: 10 })
        })
    }))
    .RecursiveOptArb.map((recursiveOptArb): Candid<Opt> => {
        const optArb = recursiveOptArb as RecursiveOpt<any>;
        return {
            src: {
                candidType: createCandidTypeFromRecursiveOpt(optArb),
                imports: createImportsFromRecursiveOpt(optArb)
            },
            value: {
                azle: createCandidValueFromRecursiveOpt(optArb),
                agent: createAgentValueFromRecursiveOpt(optArb)
            }
        };
    });

function createCandidTypeFromRecursiveOpt(
    RecursiveOpt: RecursiveOpt<any>
): string {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        return RecursiveOpt.base.src.candidType;
    } else {
        return `Opt(${createCandidTypeFromRecursiveOpt(
            RecursiveOpt.nextLayer
        )})`;
    }
}

function createImportsFromRecursiveOpt(
    RecursiveOpt: RecursiveOpt<any>
): Set<string> {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        return RecursiveOpt.base.src.imports;
    } else {
        return createImportsFromRecursiveOpt(RecursiveOpt.nextLayer);
    }
}

function createAgentValueFromRecursiveOpt(
    RecursiveOpt: RecursiveOpt<any>
): AgentOpt {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        if (RecursiveOpt.base && RecursiveOpt.base.Some !== undefined) {
            return [RecursiveOpt.base.Some.value];
        } else {
            return [];
        }
    } else {
        return [createAgentValueFromRecursiveOpt(RecursiveOpt.nextLayer)];
    }
}

function createCandidValueFromRecursiveOpt(
    RecursiveOpt: RecursiveOpt<any>
): AzleOpt<any> {
    if (RecursiveOpt.nextLayer === null) {
        // base case
        if (RecursiveOpt.base && RecursiveOpt.base.Some !== undefined) {
            return { Some: RecursiveOpt.base.Some.value };
        } else {
            return { None: null };
        }
    } else {
        return {
            Some: createCandidValueFromRecursiveOpt(RecursiveOpt.nextLayer)
        };
    }
}
