import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    RecCandidDefMemo,
    RecursiveCandidDefinition,
    VariantCandidDefinition
} from '../../candid_definition_arb/types';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { CandidType, Variant } from '../../../../../src/lib';

type Field = [string, CandidDefinition];

type RuntimeVariant = {
    [key: string]: CandidType;
};

export function VariantDefinitionArb(
    candidTypeArbForFields: RecCandidDefMemo,
    parents: RecursiveCandidDefinition[],
    n: number
): fc.Arbitrary<VariantCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            VariantFieldsArb(candidTypeArbForFields, parents, n),
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

            const runtimeCandidTypeObject =
                generateRuntimeCandidTypeObject(fields);

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
                    runtimeCandidTypeObject,
                    variableAliasDeclarations,
                    imports,
                    candidType: 'Variant'
                },
                innerTypes: fields
            };
        });
}

function VariantFieldsArb(
    candidTypeArb: RecCandidDefMemo,
    parents: RecursiveCandidDefinition[],
    n: number
): fc.Arbitrary<Field[]> {
    // Although no minLength is technically required (according to the
    // spec), the DFX CLI itself currently errors out trying to pass
    // an empty object.
    const VARIANT_MIN_FIELD_COUNT = 1;
    return fc
        .uniqueArray(JsFunctionNameArb, {
            minLength: VARIANT_MIN_FIELD_COUNT
        })
        .chain((fieldsNames) =>
            fc.tuple(
                ...fieldsNames.map((name, index) =>
                    fc.tuple(
                        fc.constant(name),
                        possiblyRecursiveArb(candidTypeArb, index, parents, n)
                    )
                )
            )
        );
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

function generateRuntimeCandidTypeObject(fields: Field[]): CandidType {
    const azleVariantConstructorObj = fields.reduce(
        (acc, [fieldName, fieldDefinition]): RuntimeVariant => {
            return {
                ...acc,
                [fieldName]: fieldDefinition.candidMeta.runtimeCandidTypeObject
            };
        },
        {}
    );

    return Variant(azleVariantConstructorObj);
}
