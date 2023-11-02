import fc from 'fast-check';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { Candid } from '../candid_arb';

type SomeOrNone = 'Some' | 'None';
type Base = [SomeOrNone, Candid<CandidType>];

type RecursiveOpt<T> = { base: T } | { nextLayer: RecursiveOpt<T> };

export type Opt = [CandidType | Opt] | never[];

// TODO look into making this recursive
// TODO we need to add all constructed and reference types
const BaseArb = fc.tuple(
    fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
    CandidTypeArb
);

export const OptArb = fc
    .letrec((tie) => ({
        RecursiveOptArb: fc.oneof(
            fc.record({
                base: BaseArb
            }),
            fc.record({
                nextLayer: tie('RecursiveOptArb').map(
                    (sample) => sample as RecursiveOpt<Base>
                )
            })
        )
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

function generateCandidType(recursiveOpt: RecursiveOpt<Base>): string {
    if ('base' in recursiveOpt) {
        // base case
        return `Opt(${recursiveOpt.base[1].src.candidType})`;
    } else {
        return `Opt(${generateCandidType(recursiveOpt.nextLayer)})`;
    }
}

function generateImports(recursiveOpt: RecursiveOpt<Base>): Set<string> {
    if ('base' in recursiveOpt) {
        // base case
        return new Set([...recursiveOpt.base[1].src.imports, 'Opt']);
    } else {
        return generateImports(recursiveOpt.nextLayer);
    }
}

function generateValue(recursiveOpt: RecursiveOpt<Base>): Opt {
    if ('base' in recursiveOpt) {
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

function generateValueLiteral(recursiveOpt: RecursiveOpt<Base>): string {
    if ('base' in recursiveOpt) {
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
    recursiveOpt: RecursiveOpt<Base>
): (a: any, b: any) => boolean {
    if ('base' in recursiveOpt) {
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
