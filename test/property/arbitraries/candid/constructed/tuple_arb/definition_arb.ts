import fc from 'fast-check';

import { CandidType, Tuple } from '../../../../../../src/lib/experimental';
import { Api, Context } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    TupleCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { RecursiveShapes } from '../../recursive';

export function TupleDefinitionArb(
    context: Context,
    candidTypeArbForFields: WithShapesArb<CandidDefinition>
): WithShapesArb<TupleCandidDefinition> {
    const api = context.api;
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            fc.array(candidTypeArbForFields, { minLength: 1 }),
            // Although no minLength is technically required (according to the
            // spec), there are some issues with vecs of empty objects that are causing some problems
            // https://github.com/demergent-labs/azle/issues/1453
            fc.boolean()
        )
        .map(
            ([
                name,
                fieldsAndShapes,
                useTypeDeclaration
            ]): WithShapes<TupleCandidDefinition> => {
                const fields = fieldsAndShapes.map(
                    (field): CandidDefinition => field.definition
                );
                const recursiveShapes = fieldsAndShapes.reduce(
                    (acc, field): RecursiveShapes => {
                        return { ...acc, ...field.recursiveShapes };
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
                            candidType: 'Tuple'
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function generateImports(fields: CandidDefinition[], api: Api): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    const tupleImports = api === 'functional' ? ['Tuple'] : ['IDL'];
    return new Set([...fieldImports, ...tupleImports]);
}
function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[],
    api: Api
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.variableAliasDeclarations
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
    fields: CandidDefinition[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        if (api === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    const innerTypesAsString = fields
        .map((field) => field.candidMeta.typeAnnotation)
        .join(', ');

    if (api === 'class') {
        return `[${innerTypesAsString}]`;
    }

    return `Tuple<[${innerTypesAsString}]>`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[],
    api: Api
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const innerTypesAsString = fields
        .map((field) => field.candidMeta.typeObject)
        .join(', ');

    if (api === 'class') {
        return `IDL.Tuple(${innerTypesAsString})`;
    }

    return `Tuple(${innerTypesAsString})`;
}

function generateRuntimeTypeObject(fields: CandidDefinition[]): CandidType {
    const innerTypes = fields.map(
        (field) => field.candidMeta.runtimeTypeObject
    );

    return Tuple(...innerTypes);
}
