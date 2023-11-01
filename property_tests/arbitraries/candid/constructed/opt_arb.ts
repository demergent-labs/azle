import fc from 'fast-check';
import { Candid, CandidType, CandidTypeArb } from '../../candid';

type InnerOptArb = ['Some' | 'None', Candid<CandidType>];

// This gives us a random Some or None, which means the default depth of all Opts is at least one
const InnerOptArb = (arb: fc.Arbitrary<Candid<CandidType>>) => {
    return fc.constantFrom('Some', 'None').chain((keySample) => {
        return arb.map((innerValueSample): InnerOptArb => {
            if (keySample === 'Some') {
                return ['Some', innerValueSample];
            } else {
                return ['None', innerValueSample];
            }
        });
    });
};

// TODO look into making this recursive
// TODO we need to add all constructed and reference types
export const PrimitiveOptArb = InnerOptArb(CandidTypeArb);

type RecursiveOpt<T> = {
    base: T;
    nextLayer: RecursiveOpt<T> | null;
};

export type Opt = [CandidType | Opt] | never[];

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
        return `Opt(${recursiveOpt.base[1].src.candidType})`;
    } else {
        return `Opt(${generateCandidType(recursiveOpt.nextLayer)})`;
    }
}

function generateImports(recursiveOpt: RecursiveOpt<InnerOptArb>): Set<string> {
    if (recursiveOpt.nextLayer === null) {
        // base case
        return new Set([...recursiveOpt.base[1].src.imports, 'Opt']);
    } else {
        return generateImports(recursiveOpt.nextLayer);
    }
}

function generateValue(recursiveOpt: RecursiveOpt<InnerOptArb>): Opt {
    if (recursiveOpt.nextLayer === null) {
        // base case
        if (recursiveOpt.base[0] === 'Some') {
            return [recursiveOpt.base[1].value];
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
        if (recursiveOpt.base[0] === 'Some') {
            return `{Some: ${recursiveOpt.base[1].src.valueLiteral}}`;
        } else {
            return `{None: null}`;
        }
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
        if (recursiveOpt.base[0] === 'Some') {
            return recursiveOpt.base[1].equals;
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

    if (isNone(value1) && isNone(value2)) {
        return true;
    }

    return equals(value1, value2);
}

function isNone(value: any | []) {
    return Array.isArray(value) && value.length === 0;
}
