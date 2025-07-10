import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { IDL } from '#lib/index';

import { Context } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    TupleCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { RecursiveShapes } from '../../recursive';

export function TupleDefinitionArb(
    context: Context<DefinitionConstraints>,
    candidTypeArbForFields: WithShapesArb<CandidDefinition>
): WithShapesArb<TupleCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            fc.array(candidTypeArbForFields, {
                minLength: 1,
                maxLength: context.constraints.maxLength
            }),
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
                    fields
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    fields
                );

                const runtimeTypeObject = generateRuntimeTypeObject(fields);

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

function generateImports(fields: CandidDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    return new Set([...fieldImports, 'IDL']);
}
function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration === true) {
        const type = [
            `type ${name} = ${generateCandidTypeAnnotation(
                false,
                name,
                fields
            )};`
        ];
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateTypeObject(false, name, fields)};`,
            ...type
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const innerTypesAsString = fields
        .map((field) => field.candidMeta.typeAnnotation)
        .join(', ');

    return `[${innerTypesAsString}]`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const innerTypesAsString = fields
        .map((field) => field.candidMeta.typeObject)
        .join(', ');

    return `IDL.Tuple(${innerTypesAsString})`;
}

function generateRuntimeTypeObject(fields: CandidDefinition[]): IDL.Type {
    const innerTypes = fields.map(
        (field) => field.candidMeta.runtimeTypeObject
    );

    return IDL.Tuple(...innerTypes);
}
