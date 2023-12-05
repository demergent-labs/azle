import fc from 'fast-check';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    RecordCandidDefinition
} from '../../candid_definition_arb/types';

type Field = [string, CandidDefinition];

export function RecordDefinitionArb(
    fieldCandidDefArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<RecordCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            fc.uniqueArray(fc.tuple(JsFunctionNameArb, fieldCandidDefArb), {
                selector: ([name, _]) => name,
                minLength: 1 // Zero length records are giving that same null error 'vec length of zero sized values too large' // I don't know if that's the same error but it seems like it is
                // https://github.com/demergent-labs/azle/issues/1453
            }),
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): RecordCandidDefinition => {
            const typeAnnotation = useTypeDeclaration
                ? name
                : generateTypeAnnotation(fields);

            const typeAliasDeclarations = generateTypeAliasDeclarations(
                name,
                fields,
                useTypeDeclaration
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    typeAnnotation,
                    typeAliasDeclarations,
                    imports,
                    candidType: 'Record'
                },
                innerTypes: fields
            };
        });
}

function generateImports(fields: Field[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field[1].candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Record']);
}

function generateTypeAnnotation(fields: Field[]): string {
    return `Record({${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.typeAnnotation}`
        )
        .join(',')}})`;
}

function generateTypeAliasDeclarations(
    name: string,
    fields: Field[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeAliasDeclarations = fields.flatMap(
        (field) => field[1].candidMeta.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeAliasDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeAliasDeclarations;
}
