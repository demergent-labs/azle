import fc from 'fast-check';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    VecCandidDefinition,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';
import { CandidType, Vec } from '../../../../../src/lib';
import { RecursiveShapes } from '../../recursive';

export function VecDefinitionArb(
    candidTypeArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints
): WithShapesArb<VecCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('typeDeclaration'),
            possiblyRecursiveArb(candidTypeArb, parents, constraints),
            fc.boolean()
        )
        .map(
            ([
                name,
                innerTypeAndShapes,
                useTypeDeclaration
            ]): WithShapes<VecCandidDefinition> => {
                const { definition: innerType, recursiveShapes } =
                    innerTypeAndShapes;
                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    innerType
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    innerType
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(innerType);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        innerType
                    );

                const imports = generateImports(innerType);

                return {
                    definition: {
                        candidMeta: {
                            candidTypeAnnotation,
                            candidTypeObject,
                            runtimeCandidTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Vec'
                        },
                        innerType: innerType
                    },
                    recursiveShapes
                };
            }
        );
}

function possiblyRecursiveArb(
    candidArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    constraints: DefinitionConstraints
): WithShapesArb<CandidDefinition> {
    const depthLevel = constraints?.depthLevel ?? 0;
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
            return candidArb(parents)(depthLevel);
        }
        return fc.oneof(
            {
                arbitrary: fc.constant({
                    definition: parents[randomIndex],
                    recursiveShapes: {}
                }),
                weight: 1
            },
            {
                arbitrary: candidArb(parents)(depthLevel),
                weight: 1
            }
        );
    });
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string[] {
    if (useTypeDeclaration) {
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                innerType
            )};`
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'Vec']);
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return `typeof ${name}.tsType`;
    }

    return `Vec<${innerType.candidMeta.candidTypeAnnotation}>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `Vec(${innerType.candidMeta.candidTypeObject})`;
}

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Vec(innerType.candidMeta.runtimeCandidTypeObject);
}
