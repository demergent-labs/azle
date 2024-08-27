import fc from 'fast-check';

import { CandidType, Record } from '../../../../../../src/lib/experimental';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Api, Context } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    CandidDefinitionArb,
    RecordCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { RecursiveShapes } from '../../recursive';

type Field = [string, CandidDefinition];

type RuntimeRecord = {
    [key: string]: CandidType;
};

export function RecordDefinitionArb(
    context: Context,
    fieldCandidDefArb: CandidDefinitionArb
): WithShapesArb<RecordCandidDefinition> {
    const api = context.api;
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
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
                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    fields,
                    api
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    fields,
                    api
                );

                const runtimeTypeObject = generateRuntimeTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields,
                        api
                    );

                const imports = generateImports(fields, api);

                return {
                    definition: {
                        candidMeta: {
                            typeAnnotation,
                            typeObject,
                            runtimeTypeObject,
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

function generateImports(fields: Field[], api: Api): Set<string> {
    const fieldImports = fields.flatMap((field): string[] => [
        ...field[1].candidMeta.imports
    ]);
    const recordImports = api === 'functional' ? ['Record'] : ['IDL'];
    return new Set([...fieldImports, ...recordImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    api: Api
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field): string[] => field[1].candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        const type =
            api === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          fields,
                          api
                      )}`
                  ];
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateTypeObject(false, name, fields, api)};`,
            ...type
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        if (api === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    return `{${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.typeAnnotation}`
        )
        .join(',')}}`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const fieldsAsString = fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.typeObject}`
        )
        .join(',');

    if (api === 'class') {
        return `IDL.Record({${fieldsAsString}})`;
    }

    return `Record({${fieldsAsString}})`;
}

function generateRuntimeTypeObject(fields: Field[]): CandidType {
    const azleRecordConstructorObj = fields.reduce(
        (acc, [fieldName, fieldDefinition]): RuntimeRecord => {
            return {
                ...acc,
                [fieldName]: fieldDefinition.candidMeta.runtimeTypeObject
            };
        },
        {}
    );

    return Record(azleRecordConstructorObj);
}
