import fc from 'fast-check';

import { CandidType, Opt } from '../../../../../../src/lib/experimental';
import { Api, Context } from '../../../types';
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
    const api = context.api;
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
                    innerType,
                    api
                );

                const typeObject = generateTypeObject(
                    useTypeDeclaration,
                    name,
                    innerType,
                    api
                );

                const runtimeTypeObject = generateRuntimeTypeObject(innerType);

                const variableAliasDeclarations =
                    generateVariableAliasDeclarations(
                        useTypeDeclaration,
                        name,
                        innerType,
                        api
                    );

                const imports = generateImports(innerType, api);

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

function generateImports(innerType: CandidDefinition, api: Api): Set<string> {
    const optImports = api === 'functional' ? ['Opt', 'Some', 'None'] : ['IDL'];
    return new Set([...innerType.candidMeta.imports, ...optImports]);
}

function generateVariableAliasDeclarations(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    api: Api
): string[] {
    if (useTypeDeclaration) {
        const type =
            api === 'functional'
                ? []
                : [
                      `type ${name} = ${generateCandidTypeAnnotation(
                          false,
                          name,
                          innerType,
                          api
                      )}`
                  ];
        return [
            ...innerType.candidMeta.variableAliasDeclarations,
            `const ${name} = ${generateTypeObject(
                false,
                name,
                innerType,
                api
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
    api: Api
): string {
    if (useTypeDeclaration === true) {
        if (api === 'class') {
            return name;
        }
        return `typeof ${name}.tsType`;
    }

    if (api === 'class') {
        return `[${innerType.candidMeta.typeAnnotation}] | []`;
    }

    return `Opt<${innerType.candidMeta.typeAnnotation}>`;
}

function generateTypeObject(
    useTypeDeclaration: boolean,
    name: string,
    innerType: CandidDefinition,
    api: Api
): string {
    if (useTypeDeclaration === true) {
        return name;
    }

    if (api === 'class') {
        return `IDL.Opt(${innerType.candidMeta.typeObject})`;
    }

    return `Opt(${innerType.candidMeta.typeObject})`;
}

function generateRuntimeTypeObject(innerType: CandidDefinition): CandidType {
    return Opt(innerType.candidMeta.runtimeTypeObject);
}
