import fc from 'fast-check';

import { CandidMeta } from '../candid_arb';
import { CandidType, CandidTypeArb } from '../candid_type_arb';
import { UniqueIdentifierArb } from '../../unique_identifier_arb';

export type Tuple = CandidType[];

export const TupleArb = fc
    .tuple(UniqueIdentifierArb('typeDeclaration'), fc.array(CandidTypeArb))
    .map(([name, fields]): CandidMeta<Tuple> => {
        const innerTypes = fields.map((field) => field.src.candidType);

        const typeDeclaration = `const ${name} = Tuple(${innerTypes.join(
            ', '
        )});`;

        const imports = generateImports(fields);

        const valueLiteral = generateValueLiteral(fields);

        const value = fields.map((field) => field.value);

        return {
            src: {
                candidType: name,
                typeDeclaration,
                imports,
                valueLiteral
            },
            value
        };
    });

function generateImports(fields: CandidMeta<CandidType>[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [...field.src.imports]);
    return new Set([...fieldImports, 'Tuple']);
}

function generateValueLiteral(fields: CandidMeta<CandidType>[]) {
    const fieldLiterals = fields
        .map((field) => field.src.valueLiteral)
        .join(',\n');

    return `[
        ${fieldLiterals}
    ]`;
}
