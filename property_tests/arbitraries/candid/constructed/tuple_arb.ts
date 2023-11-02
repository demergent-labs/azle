import fc from 'fast-check';

import { Candid } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export type Tuple = CandidType[];

export const TupleArb = fc
    .tuple(UniqueIdentifierArb('typeDeclaration'), fc.array(CandidTypeArb))
    .map(([name, fields]): Candid<Tuple> => {
        const innerTypes = fields.map((field) => field.src.candidType);

        const typeDeclaration = `const ${name} = Tuple(${innerTypes.join(
            ', '
        )});`;

        const imports = generateImports(fields);

        const valueLiteral = generateValueLiteral(fields);

        const value = fields.map((field) => field.value);

        const equals = generateEqualsMethod(fields);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports,
                valueLiteral
            },
            value,
            equals
        };
    });

function generateImports(fields: Candid<CandidType>[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [...field.src.imports]);
    return new Set([...fieldImports, 'Tuple']);
}

function generateValueLiteral(fields: Candid<CandidType>[]) {
    const fieldLiterals = fields
        .map((field) => field.src.valueLiteral)
        .join(',\n');

    return `[
        ${fieldLiterals}
    ]`;
}

function generateEqualsMethod(
    fields: Candid<CandidType>[]
): (a: Tuple, b: Tuple) => boolean {
    return (a: Tuple, b: Tuple): boolean => {
        if (typeof a !== typeof b) {
            return false;
        }

        const aFieldNames = Object.keys(a);
        const bFieldNames = Object.keys(b);
        if (aFieldNames.length !== bFieldNames.length) {
            return false;
        }

        const areFieldNamesTheSame = aFieldNames.reduce(
            (acc, aFieldName, index) =>
                acc && aFieldName === bFieldNames[index],
            true
        );

        if (!areFieldNamesTheSame) {
            return false;
        }

        const areFieldValuesTheSame = fields.reduce((acc, field, index) => {
            return acc && field.equals(a[index], b[index]);
        }, true);

        return areFieldValuesTheSame;
    };
}
