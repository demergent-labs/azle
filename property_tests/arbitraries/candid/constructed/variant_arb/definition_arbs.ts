import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    VariantCandidDefinition
} from '../../candid_definition_arb/types';
import { JsFunctionNameArb } from '../../../js_function_name_arb';

type Field = [string, CandidDefinition];

export function VariantDefinitionArb(
    candidTypeArbForFields: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<VariantCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            VariantFieldsArb(candidTypeArbForFields),
            fc.boolean()
        )
        .map(([name, fields, useTypeDeclaration]): VariantCandidDefinition => {
            const candidTypeAnnotation = generateCandidTypeAnnotation(
                useTypeDeclaration,
                name,
                fields
            );

            const candidTypeObject = generateCandidTypeObject(
                useTypeDeclaration,
                name,
                fields
            );

            const variableAliasDeclarations = generateVariableAliasDeclarations(
                useTypeDeclaration,
                name,
                fields
            );

            const imports = generateImports(fields);

            return {
                candidMeta: {
                    candidTypeAnnotation,
                    candidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    candidType: 'Variant'
                },
                innerTypes: fields
            };
        });
}

function VariantFieldsArb(
    candidTypeArb: fc.Arbitrary<CandidDefinition>
): fc.Arbitrary<Field[]> {
    return fc.uniqueArray(fc.tuple(JsFunctionNameArb, candidTypeArb), {
        selector: ([name, _]) => name,
        minLength: 1
        // Although no minLength is technically required (according to the
        // spec), the DFX CLI itself currently errors out trying to pass
        // an empty object.
    });
}

function generateImports(fields: Field[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field[1].candidMeta.imports
    ]);
    return new Set([...fieldImports, 'RequireExactlyOne', 'Variant']);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[]
): string[] {
    const fieldTypeDeclarations = fields.flatMap(
        (field) => field[1].candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeDeclarations,
            `const ${name} = ${generateCandidTypeObject(false, name, fields)};`
        ];
    }
    return fieldTypeDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[]
): string {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    return `RequireExactlyOne<{${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.candidTypeAnnotation}`
        )
        .join(',')}}>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[]
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `Variant({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.candidTypeObject}`
        )
        .join(',')}})`;
}
