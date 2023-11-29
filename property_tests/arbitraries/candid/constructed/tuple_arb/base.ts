import fc from 'fast-check';

import { CandidValueAndMeta } from '../../candid_value_and_meta';
import { CorrespondingJSType } from '../../candid_type_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import { ReturnTuple, Tuple } from './index';

export function TupleArb(
    candidTypeArb: fc.Arbitrary<CandidValueAndMeta<CorrespondingJSType>>
) {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.array(candidTypeArb),
            fc.boolean()
        )
        .map(
            ([name, fields, useTypeDeclaration]): CandidValueAndMeta<
                Tuple,
                ReturnTuple
            > => {
                const typeAnnotation = useTypeDeclaration
                    ? name
                    : generateTypeAnnotation(fields);

                const typeAliasDeclarations = generateTypeAliasDeclarations(
                    name,
                    fields,
                    useTypeDeclaration
                );

                const imports = generateImports(fields);

                const valueLiteral = generateValueLiteral(fields);

                const agentArgumentValue = generateVale(fields);

                const agentResponseValue = generateExpectedValue(fields);

                return {
                    src: {
                        typeAnnotation,
                        typeAliasDeclarations,
                        imports,
                        valueLiteral
                    },
                    agentArgumentValue,
                    agentResponseValue
                };
            }
        );
}

function generateVale(fields: CandidValueAndMeta<CorrespondingJSType>[]) {
    return fields.map((field) => field.agentArgumentValue);
}

function generateExpectedValue(
    fields: CandidValueAndMeta<CorrespondingJSType>[]
): ReturnTuple {
    if (fields.length === 0) {
        return {};
    }
    return fields.map((field) => field.agentResponseValue);
}

function generateTypeAliasDeclarations(
    name: string,
    fields: CandidValueAndMeta<CorrespondingJSType>[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeAliasDeclarations = fields.flatMap(
        (field) => field.src.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeAliasDeclarations;
}

function generateTypeAnnotation(
    fields: CandidValueAndMeta<CorrespondingJSType>[]
) {
    const innerTypes = fields.map((field) => field.src.typeAnnotation);

    return `Tuple(${innerTypes.join(', ')})`;
}

function generateImports(
    fields: CandidValueAndMeta<CorrespondingJSType>[]
): Set<string> {
    const fieldImports = fields.flatMap((field) => [...field.src.imports]);
    return new Set([...fieldImports, 'Tuple']);
}

function generateValueLiteral(
    fields: CandidValueAndMeta<CorrespondingJSType>[]
) {
    const fieldLiterals = fields
        .map((field) => field.src.valueLiteral)
        .join(',\n');

    return `[
        ${fieldLiterals}
    ]`;
}
