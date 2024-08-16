import fc from 'fast-check';

import { CandidType, Tuple } from '../../../../../src/lib/experimental';
import { Syntax } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    TupleCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { RecursiveShapes } from '../../recursive';

export function TupleDefinitionArb(
    candidTypeArbForFields: WithShapesArb<CandidDefinition>,
    syntax: Syntax
): WithShapesArb<TupleCandidDefinition> {
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
                            candidType: 'Tuple',
                            idl: generateIdl(fields)
                        },
                        innerTypes: fields
                    },
                    recursiveShapes
                };
            }
        );
}

function generateImports(
    fields: CandidDefinition[],
    syntax: Syntax
): Set<string> {
    const fieldImports = fields.flatMap((field) => [
        ...field.candidMeta.imports
    ]);
    const tupleImports = syntax === 'functional' ? ['Tuple'] : ['IDL'];
    return new Set([...fieldImports, ...tupleImports]);
}
function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[],
    syntax: Syntax
): string[] {
    const fieldVariableAliasDeclarations = fields.flatMap(
        (field) => field.candidMeta.variableAliasDeclarations
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
    fields: CandidDefinition[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    const innerTypesAsString = fields
        .map((field) => field.candidMeta.candidTypeAnnotation)
        .join(', ');

    if (syntax === 'class') {
        return `[${innerTypesAsString}]`;
    }

    return `Tuple<[${innerTypesAsString}]>`;
}

function generateIdl(fields: CandidDefinition[]): string {
    const innerTypesAsString = fields
        .map((field) => field.candidMeta.candidTypeAnnotation)
        .join(', ');

    return `IDL.Tuple(${innerTypesAsString})`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    fields: CandidDefinition[],
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    const innerTypesAsString = fields
        .map((field) => field.candidMeta.candidTypeObject)
        .join(', ');

    if (syntax === 'class') {
        return `IDL.Tuple(${innerTypesAsString})`;
    }

    return `Tuple(${innerTypesAsString})`;
}

function generateRuntimeCandidTypeObject(
    fields: CandidDefinition[]
): CandidType {
    const innerTypes = fields.map(
        (field) => field.candidMeta.runtimeCandidTypeObject
    );

    return Tuple(...innerTypes);
}
