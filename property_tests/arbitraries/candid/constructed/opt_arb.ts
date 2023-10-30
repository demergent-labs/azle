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
import { PrincipalArb } from '../reference/principal_arb';

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
    // InnerOptArb(PrincipalArb)
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
            },
            equals: (a, b) => areOptsEqual(getBaseEquals(optArb), a, b)
        };
    });

function createCandidTypeFromRecursiveOpt(
    recursiveOpt: RecursiveOpt<any>
): string {
    if (recursiveOpt.nextLayer === null) {
        // base case
        return recursiveOpt.base.src.candidType;
    } else {
        return `Opt(${createCandidTypeFromRecursiveOpt(
            recursiveOpt.nextLayer
        )})`;
    }
}

function createImportsFromRecursiveOpt(
    recursiveOpt: RecursiveOpt<any>
): Set<string> {
    if (recursiveOpt.nextLayer === null) {
        // base case
        return recursiveOpt.base.src.imports;
    } else {
        return createImportsFromRecursiveOpt(recursiveOpt.nextLayer);
    }
}

function createAgentValueFromRecursiveOpt(
    recursiveOpt: RecursiveOpt<any>
): AgentOpt {
    if (recursiveOpt.nextLayer === null) {
        // base case
        if (recursiveOpt.base && recursiveOpt.base.Some !== undefined) {
            return [recursiveOpt.base.Some.value];
        } else {
            return [];
        }
    } else {
        return [createAgentValueFromRecursiveOpt(recursiveOpt.nextLayer)];
    }
}

function createCandidValueFromRecursiveOpt(
    recursiveOpt: RecursiveOpt<any>
): AzleOpt<any> {
    if (recursiveOpt.nextLayer === null) {
        // base case
        if (recursiveOpt.base && recursiveOpt.base.Some !== undefined) {
            return { Some: recursiveOpt.base.Some.value };
        } else {
            return { None: null };
        }
    } else {
        return {
            Some: createCandidValueFromRecursiveOpt(recursiveOpt.nextLayer)
        };
    }
}

function calculateDepthAndValues(value: [any] | []): {
    depth: number;
    value: any;
} {
    if (value.length === 0) {
        // None
        return { depth: 1, value };
    }
    const isOpt =
        Array.isArray(value[0]) &&
        (value[0].length === 1 || value[0].length === 0);
    if (!isOpt) {
        // The value.Some is not an opt. return value.Some
        return {
            depth: 1,
            value: value[0]
        };
    }

    const result = calculateDepthAndValues(value[0]);
    return { ...result, depth: result.depth + 1 };
}

function getBaseEquals(
    recursiveOpt: RecursiveOpt<any>
): (a: any, b: any) => boolean {
    if (recursiveOpt.nextLayer === null) {
        // base case
        if (recursiveOpt.base && recursiveOpt.base.Some !== undefined) {
            return recursiveOpt.base.Some.equals;
        } else {
            return (a: null, b: null) => a === b;
        }
    } else {
        return getBaseEquals(recursiveOpt.nextLayer);
    }
}

function areOptsEqual(
    equals: (a: any, b: any) => boolean,
    opt1: any,
    opt2: any
) {
    const { depth: depth1, value: value1 } = calculateDepthAndValues(opt1);
    const { depth: depth2, value: value2 } = calculateDepthAndValues(opt2);

    if (depth1 !== depth2) {
        return false;
    }

    function isNone(value: any | []) {
        return Array.isArray(value) && value.length === 0;
    }
    if (isNone(value1) && isNone(value2)) {
        return true;
    }

    return equals(value1, value2);
}
