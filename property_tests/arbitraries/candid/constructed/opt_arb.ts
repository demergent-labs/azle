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
import { Principal } from '@dfinity/principal';

type InnerOpt = number | bigint | null | string | boolean | Opt | Principal;
type InnerOptArb = Candid<{ Some?: Candid<InnerOpt>; None?: null }>;

// This gives us a random Some or None, which means the default depth of all Opts is at least one
const InnerOptArb = (arb: fc.Arbitrary<Candid<InnerOpt>>) => {
    return fc.constantFrom('Some', 'None').chain((keySample) => {
        return arb.map((innerValueSample): InnerOptArb => {
            if (keySample === 'Some') {
                return {
                    value: { Some: innerValueSample },
                    src: {
                        candidType: `Opt(${innerValueSample.src.candidType})`,
                        imports: new Set([
                            ...innerValueSample.src.imports,
                            'Opt'
                        ]),
                        valueLiteral: `{Some: ${innerValueSample.src.valueLiteral}}`
                    },
                    equals: (a, b) => {
                        if (a.Some === undefined || b.Some === undefined) {
                            return false;
                        }
                        return innerValueSample.equals(
                            a.Some.value,
                            b.Some.value
                        );
                    }
                };
            } else {
                return {
                    value: { None: null },
                    src: {
                        candidType: `Opt(${innerValueSample.src.candidType})`,
                        imports: new Set([
                            ...innerValueSample.src.imports,
                            'Opt'
                        ]),
                        valueLiteral: '{None: null}'
                    },
                    equals: (a, b) => {
                        if (a.None === undefined || b.None === undefined) {
                            return false;
                        }
                        return a.None === b.None;
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
    InnerOptArb(NullArb),
    InnerOptArb(PrincipalArb)
);

type RecursiveOpt<T> = {
    base: T;
    nextLayer: RecursiveOpt<T> | null;
};

export type Opt = [InnerOpt] | never[];

export const OptArb = fc
    .letrec((tie) => ({
        RecursiveOptArb: fc.record({
            base: PrimitiveOptArb,
            nextLayer: fc
                .option(tie('RecursiveOptArb'), { maxDepth: 10 })
                .map((sample) => sample as RecursiveOpt<InnerOptArb>)
        })
    }))
    .RecursiveOptArb.map((recursiveOptArb): Candid<Opt> => {
        return {
            src: {
                candidType: generateCandidType(recursiveOptArb),
                imports: generateImports(recursiveOptArb),
                valueLiteral: generateValueLiteral(recursiveOptArb)
            },
            value: generateValue(recursiveOptArb),
            equals: (a, b) => areOptsEqual(getBaseEquals(recursiveOptArb), a, b)
        };
    });

function generateCandidType(recursiveOpt: RecursiveOpt<InnerOptArb>): string {
    if (recursiveOpt.nextLayer === null) {
        // base case
        return recursiveOpt.base.src.candidType;
    } else {
        return `Opt(${generateCandidType(recursiveOpt.nextLayer)})`;
    }
}

function generateImports(recursiveOpt: RecursiveOpt<InnerOptArb>): Set<string> {
    if (recursiveOpt.nextLayer === null) {
        // base case
        return recursiveOpt.base.src.imports;
    } else {
        return generateImports(recursiveOpt.nextLayer);
    }
}

function generateValue(recursiveOpt: RecursiveOpt<InnerOptArb>): Opt {
    if (recursiveOpt.nextLayer === null) {
        // base case
        if (recursiveOpt.base.value.Some !== undefined) {
            return [recursiveOpt.base.value.Some.value];
        } else {
            return [];
        }
    } else {
        return [generateValue(recursiveOpt.nextLayer)];
    }
}

function generateValueLiteral(recursiveOpt: RecursiveOpt<InnerOptArb>): string {
    if (recursiveOpt.nextLayer === null) {
        // base case
        return recursiveOpt.base.src.valueLiteral;
    } else {
        return `{
            Some: ${generateValueLiteral(recursiveOpt.nextLayer)}
        }`;
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
    recursiveOpt: RecursiveOpt<InnerOptArb>
): (a: any, b: any) => boolean {
    if (recursiveOpt.nextLayer === null) {
        // base case
        if (recursiveOpt.base.value.Some !== undefined) {
            return recursiveOpt.base.value.Some.equals;
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
