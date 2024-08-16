import fc from 'fast-check';

import { CandidType, Record } from '../../../../../src/lib/experimental';
import { JsFunctionNameArb } from '../../../js_function_name_arb';
import { Syntax } from '../../../types';
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
    fieldCandidDefArb: CandidDefinitionArb,
    syntax: Syntax
): WithShapesArb<RecordCandidDefinition> {
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
                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    fields,
                    syntax
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    fields,
                    syntax
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(fields);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        fields,
                        syntax
                    );

                const imports = generateImports(fields, syntax);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Record',
                            idl: generateIdl(fields)
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function generateImports(fields: Field[], syntax: Syntax): Set<string> {
    const fieldImports = fields.flatMap((field): string[] => [
        ...field[1].candidMeta.imports
    ]);
    const recordImports = syntax === 'functional' ? ['Record'] : ['IDL'];
    return new Set([...fieldImports, ...recordImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    syntax: Syntax
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field): string[] => field[1].candidMeta.variableAliasDeclarations
    );
    const type =
        syntax === 'functional'
            ? []
            : [
                  `type ${name} = ${generateCandidTypeAnnotation(
                      false,
                      name,
                      fields,
                      syntax
                  )}`
              ];
    if (useTypeDeclaration) {
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                fields,
                syntax
            )};`,
            ...type
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    return `{${fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.candidTypeAnnotation}`
        )
        .join(',')}}`;
}

function generateIdl(_fields: Field[]): string {
    return '';
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: Field[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const fieldsAsString = fields
        .map(
            ([fieldName, fieldDefinition]) =>
                `${fieldName}: ${fieldDefinition.candidMeta.candidTypeObject}`
        )
        .join(',');

    if (syntax === 'class') {
        return `IDL.Record({${fieldsAsString}})`;
    }

    return `Record({${fieldsAsString}})`;
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
