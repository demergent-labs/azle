import fc from 'fast-check';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { CandidMeta } from '../candid_arb';

type SomeOrNone = 'Some' | 'None';
type Base = {
    someOrNone: SomeOrNone;
    candid: CandidMeta<CandidType>;
};

type RecursiveOpt<T> = { base: T } | { nextLayer: RecursiveOpt<T> };

export type Opt = [CandidType] | never[];

// TODO look into making this recursive
// TODO we need to add all constructed and reference types
const BaseArb = fc
    .tuple(
        fc.constantFrom('Some', 'None') as fc.Arbitrary<SomeOrNone>,
        CandidTypeArb
    )
    .map(([someOrNone, candid]) => ({ someOrNone, candid }) as Base);

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
    .RecursiveOptArb.map((recursiveOptArb): CandidMeta<Opt> => {
        return {
            src: {
                candidType: generateCandidType(recursiveOptArb),
                imports: generateImports(recursiveOptArb),
                valueLiteral: generateValueLiteral(recursiveOptArb)
            },
            value: generateValue(recursiveOptArb),
            expectedValue: generateValue(recursiveOptArb)
        };
    });

function generateCandidType(recursiveOpt: RecursiveOpt<Base>): string {
    if ('base' in recursiveOpt) {
        // base case
        return `Opt(${recursiveOpt.base.candid.src.candidType})`;
    } else {
        return `Opt(${generateCandidType(recursiveOpt.nextLayer)})`;
    }
}

function generateImports(recursiveOpt: RecursiveOpt<Base>): Set<string> {
    if ('base' in recursiveOpt) {
        // base case
        return new Set([
            ...recursiveOpt.base.candid.src.imports,
            'Opt',
            'Some',
            'None'
        ]);
    } else {
        return generateImports(recursiveOpt.nextLayer);
    }
}

function generateValue(recursiveOpt: RecursiveOpt<Base>): Opt {
    if ('base' in recursiveOpt) {
        // base case
        if (recursiveOpt.base.someOrNone === 'Some') {
            return [recursiveOpt.base.candid.value];
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
        if (recursiveOpt.base.someOrNone === 'Some') {
            return `Some(${recursiveOpt.base.candid.src.valueLiteral})`;
        } else {
            return `None`;
        }
    } else {
        return `Some(${generateValueLiteral(recursiveOpt.nextLayer)})`;
    }
}
