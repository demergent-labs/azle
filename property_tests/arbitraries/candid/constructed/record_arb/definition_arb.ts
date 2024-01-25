import fc from 'fast-check';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    CandidDefinitionArb,
    RecordCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidType, Record } from '../../../../../src/lib';
import { RecursiveShapes } from '../../recursive';

type Field = [string, CandidDefinition];

type RuntimeRecord = {
    [key: string]: CandidType;
};

export function RecordDefinitionArb(
    fieldCandidDefArb: CandidDefinitionArb
): WithShapesArb<RecordCandidDefinition> {
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
        .map(
            ([
                name,
                fieldsAndShapes,
                useTypeDeclaration
            ]): WithShapes<RecordCandidDefinition> => {
                const fields = fieldsAndShapes.map(
                    (field): Field => [field[0], field[1].definition]
                );
                const recursiveShapes = fieldsAndShapes.reduce(
                    (acc, field): RecursiveShapes => {
                        return { ...acc, ...field[1].recursiveShapes };
                    },
                    {}
                );
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

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields
                    );

                const imports = generateImports(fields);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Record'
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function generateImports(fields: Field[]): Set<string> {
    const fieldImports = fields.flatMap((field): string[] => [
        ...field[1].candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Record']);
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[]
): string {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    return `{${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.candidTypeAnnotation}`
        )
        .join(',')}}`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[]
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `Record({${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.candidTypeObject}`
        )
        .join(',')}})`;
}

function generateRuntimeCandidTypeObject(fields: Field[]): CandidType {
    const azleRecordConstructorObj = fields.reduce(
        (acc, [fieldName, fieldDefinition]): RuntimeRecord => {
            return {
                ...acc,
                [fieldName]: fieldDefinition.candidMeta.runtimeCandidTypeObject
            };
        },
        {}
    );

    return Record(azleRecordConstructorObj);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[]
): string[] {
    const fieldVariableAliasDefinitions = fields.flatMap(
        (field): string[] => field[1].candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldVariableAliasDefinitions,
            `const ${name} = ${generateCandidTypeObject(false, name, fields)};`
        ];
    }
    return fieldVariableAliasDefinitions;
}
