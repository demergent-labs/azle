import fc from 'fast-check';

import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { CandidMeta } from '../../candid_arb';
import { CandidType } from '../../candid_type_arb';
import { ReturnTuple, Tuple } from './index';

export function TupleArb(candidTypeArb: fc.Arbitrary<CandidMeta<CandidType>>) {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.array(candidTypeArb),
            fc.boolean()
        )
        .map(
            ([name, fields, useTypeDeclaration]): CandidMeta<
                Tuple,
                ReturnTuple
            > => {
                const candidType = useTypeDeclaration
                    ? name
                    : generateCandidType(fields);

                const typeDeclaration = generateTypeDeclaration(
                    name,
                    fields,
                    useTypeDeclaration
                );

                const imports = generateImports(fields);

                const valueLiteral = generateValueLiteral(fields);

                const agentArgumentValue = generateVale(fields);

                const agentResponseValue = generateExpectedVale(fields);

                return {
                    src: {
                        candidType,
                        typeDeclaration,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue,
                    agentResponseValue
                };
            }
        );
}

function generateVale(fields: CandidMeta<CandidType>[]) {
    return fields.map((field) => field.agentArgumentValue);
}

function generateExpectedVale(fields: CandidMeta<CandidType>[]): Tuple | {} {
    if (fields.length === 0) {
        return {};
    }
    return fields.map((field) => field.agentResponseValue);
}

function generateTypeDeclaration(
    name: string,
    fields: CandidMeta<CandidType>[],
    useTypeDeclaration: boolean
): string {
    const fieldTypeDeclarations = fields
        .map((field) => field.src.typeDeclaration)
        .join('\n');
    if (useTypeDeclaration) {
        return `${fieldTypeDeclarations}\nconst ${name} = ${generateCandidType(
            fields
        )};`;
    }
    return fieldTypeDeclarations;
}

function generateCandidType(fields: CandidMeta<CandidType>[]) {
    const innerTypes = fields.map((field) => field.src.candidType);

    return `Tuple(${innerTypes.join(', ')})`;
}

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
