import fc from 'fast-check';

import { CandidType, Vec } from '../../../../../src/lib/experimental';
import { Syntax } from '../../../types';
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

export function VecDefinitionArb(
    candidTypeArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[],
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<VecCandidDefinition> {
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            possiblyRecursiveArb(candidTypeArb, parents, syntax, constraints),
            fc.boolean()
        )
        .map(
            ([
                name,
                innerTypeAndShapes,
                useTypeDeclarationChance
            ]): WithShapes<VecCandidDefinition> => {
                const useTypeDeclaration =
                    (constraints.forceInline === undefined ||
                        constraints.forceInline === false) &&
                    useTypeDeclarationChance;
                const { definition: innerType, recursiveShapes } =
                    innerTypeAndShapes;
                const candidTypeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    innerType,
                    syntax
                );

                const candidTypeObject = generateCandidTypeObject(
                    useTypeDeclaration,
                    name,
                    innerType,
                    syntax
                );

                const runtimeCandidTypeObject =
                    generateRuntimeCandidTypeObject(innerType);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        innerType,
                        syntax
                    );

                const imports = generateImports(innerType, syntax);

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
    syntax: Syntax,
    constraints: DefinitionConstraints
): WithShapesArb<CandidDefinition> {
    const depthLevel = constraints?.depthLevel ?? 0;
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
            return candidArb(parents, syntax)(depthLevel);
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
                arbitrary: candidArb(parents, syntax)(depthLevel),
                weight: 1
            }
        );
    });
}

function generateImports(
    innerType: CandidDefinition,
    syntax: Syntax
): Set<string> {
    const vecImports = syntax === 'functional' ? ['Vec'] : ['IDL'];
    return new Set([...innerType.candidMeta.imports, ...vecImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    syntax: Syntax
): string[] {
    if (useTypeDeclaration) {
        const type =
            syntax === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          innerType,
                          syntax
                      )}`
                  ];
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateCandidTypeObject(
                false,
                name,
                innerType,
                syntax
            )};`,
            ...type
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        if (syntax === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    if (syntax === 'class') {
        return `${innerType.candidMeta.candidTypeAnnotation}[]`;
    }

    return `Vec<${innerType.candidMeta.candidTypeAnnotation}>`;
}

function generateCandidTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    syntax: Syntax
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    if (syntax === 'class') {
        return `IDL.Vec(${innerType.candidMeta.candidTypeObject})`;
    }

    return `Vec(${innerType.candidMeta.candidTypeObject})`;
}

function generateRuntimeCandidTypeObject(
    innerType: CandidDefinition
): CandidType {
    return Vec(innerType.candidMeta.runtimeCandidTypeObject);
}
