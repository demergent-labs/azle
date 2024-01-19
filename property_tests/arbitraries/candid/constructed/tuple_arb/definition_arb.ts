import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    TupleCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidType, Tuple } from '../../../../../src/lib';
import { RecursiveShapes } from '../../recursive';

export function TupleDefinitionArb(
    candidTypeArbForFields: WithShapesArb<CandidDefinition>
): WithShapesArb<TupleCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
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
                            candidType: 'Tuple'
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.variableAliasDeclarations
    );
    if (useTypeDeclaration) {
        return [
            ...fieldVariableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(false, name, fields)};`
        ];
    }
    return fieldVariableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
) {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    const innerTypes = fields.map(
        (field) => field.candidMeta.candidTypeAnnotation
    );

    return `Tuple<[${innerTypes.join(', ')}]>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[]
) {
    if (useTypeDeclaration === true) {
        return name;
    }

    const innerTypes = fields.map((field) => field.candidMeta.candidTypeObject);

    return `Tuple(${innerTypes.join(', ')})`;
}

function generateRuntimeCandidTypeObject(
    fields: CandidDefinition[]
): CandidType {
    const innerTypes = fields.map(
        (field) => field.candidMeta.runtimeCandidTypeObject
    );

    return Tuple(...innerTypes);
}

function generateImports(fields: CandidDefinition[]): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    return new Set([...fieldImports, 'Tuple']);
}
