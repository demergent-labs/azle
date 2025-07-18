import '#experimental/build/assert_experimental';

import fc from 'fast-check';

import { IDL } from '#lib/index';

import { Context } from '../../../types';
import { UniqueIdentifierArb } from '../../../unique_identifier_arb';
import {
    CandidDefinition,
    DefinitionConstraints,
    OptCandidDefinition,
    RecursiveCandidDefinitionMemo,
    RecursiveCandidName,
    WithShapes,
    WithShapesArb
} from '../../candid_definition_arb/types';

export function OptDefinitionArb(
    context: Context<DefinitionConstraints>,
    candidTypeArbForInnerType: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<OptCandidDefinition> {
    const constraints = context.constraints;
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            possiblyRecursiveArb(context, candidTypeArbForInnerType, parents),
            fc.boolean()
        )
        .map(
            ([
                name,
                innerTypeAndShapes,
                useTypeDeclarationChance
            ]): WithShapes<OptCandidDefinition> => {
                const useTypeDeclaration =
                    (constraints.forceInline === undefined ||
                        constraints.forceInline === false) &&
                    useTypeDeclarationChance;
                const { definition: innerType, recursiveShapes } =
                    innerTypeAndShapes;
                const typeAnnotation = generateCandidTypeAnnotation(
                    useTypeDeclaration,
                    name,
                    innerType
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    innerType
                );

                const runtimeTypeObject = generateRuntimeTypeObject(innerType);

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
                            typeAnnotation,
                            typeObject,
                            runtimeTypeObject,
                            variableAliasDeclarations,
                            imports,
                            candidType: 'Opt'
                        },
                        innerType
                    },
                    recursiveShapes
                };
            }
        );
}

function possiblyRecursiveArb(
    context: Context<DefinitionConstraints>,
    candidArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<CandidDefinition> {
    const depthLevel = context.constraints.depthLevel ?? 0;
    const newContext = {
        ...context,
        constraints: {
            ...context.constraints,
            depthLevel: depthLevel - 1
        }
    };
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0 || depthLevel < 1) {
            // If there are no recursive parents or we have reached a depth
            // level of 0 just do a regular arb inner type
            return candidArb(newContext, parents)(depthLevel);
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
                arbitrary: candidArb(newContext, parents)(depthLevel),
                weight: 1
            }
        );
    });
}

function generateImports(innerType: CandidDefinition): Set<string> {
    return new Set([...innerType.candidMeta.imports, 'IDL']);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string[] {
    if (useTypeDeclaration === true) {
        const type = [
            `type ${name} = ${generateCandidTypeAnnotation(
                false,
                name,
                innerType
            )};`
        ];
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateTypeObject(false, name, innerType)};`,
            ...type
        ];
    }
    return innerType.candidMeta.variableAliasDeclarations;
}

function generateCandidTypeAnnotation(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `[${innerType.candidMeta.typeAnnotation}] | []`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    return `IDL.Opt(${innerType.candidMeta.typeObject})`;
}

function generateRuntimeTypeObject(innerType: CandidDefinition): IDL.Type {
    // TODO IDL.Empty is a placeholder for void...not quite correct
    return IDL.Opt(innerType.candidMeta.runtimeTypeObject ?? IDL.Empty);
}
