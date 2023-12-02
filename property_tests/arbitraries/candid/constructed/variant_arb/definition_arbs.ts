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
    return new Set([...fieldImports, 'Variant']);
}

function generateTypeAliasDeclarations(
    name: string,
    fields: Field[],
    useTypeDeclaration: boolean
): string[] {
    const fieldTypeDeclarations = fields.flatMap(
        (field) => field[1].candidMeta.typeAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldTypeDeclarations,
            `const ${name} = ${generateTypeAnnotation(fields)};`
        ];
    }
    return fieldTypeDeclarations;
}

function generateTypeAnnotation(fields: Field[]): string {
    return `Variant({${fields
        .map(
            ([fieldName, fieldDataType]) =>
                `${fieldName}: ${fieldDataType.candidMeta.typeAnnotation}`
        )
        .join(',')}})`;
}
