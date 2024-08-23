import fc from 'fast-check';

import { CandidType, Vec } from '../../../../../../src/lib/experimental';
import { Api, Context } from '../../../types';
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
    context: Context<DefinitionConstraints>,
    candidTypeArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<VecCandidDefinition> {
    const api = context.api;
    return fc
        .tuple(
            UniqueIdentifierArb('globalNames'),
            possiblyRecursiveArb(context, candidTypeArb, parents),
            fc.boolean()
        )
        .map(
            ([
                name,
                innerTypeAndShapes,
                useTypeDeclarationChance
            ]): WithShapes<VecCandidDefinition> => {
                const useTypeDeclaration =
                    (context.constraints.forceInline === undefined ||
                        context.constraints.forceInline === false) &&
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
    context: Context<DefinitionConstraints>,
    candidArb: RecursiveCandidDefinitionMemo,
    parents: RecursiveCandidName[]
): WithShapesArb<CandidDefinition> {
    const depthLevel = context.constraints.depthLevel ?? 0;
    const newContext = {
        ...context,
        constraints: { ...context.constraints, depthLevel: depthLevel - 1 }
    };
    return fc.nat(Math.max(parents.length - 1, 0)).chain((randomIndex) => {
        if (parents.length === 0) {
            // If there are no recursive parents or this is the first variant field just do a regular arb field
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
    const vecImports = api === 'functional' ? ['Vec'] : ['IDL'];
    return new Set([...innerType.candidMeta.imports, ...vecImports]);
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
        return toClassTypeAnnotation(innerType);
    }

    return `Vec<${innerType.candidMeta.typeAnnotation}>`;
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
        return `IDL.Vec(${innerType.candidMeta.typeObject})`;
    }

    return `Vec(${innerType.candidMeta.typeObject})`;
}

function generateRuntimeTypeObject(innerType: CandidDefinition): CandidType {
    return Vec(innerType.candidMeta.runtimeTypeObject);
}

function toClassTypeAnnotation(innerType: CandidDefinition): string {
    if (innerType.candidMeta.candidType === 'int64') {
        return `BigInt64Array`;
    }

    if (innerType.candidMeta.candidType === 'int32') {
        return `Int32Array`;
    }

    if (innerType.candidMeta.candidType === 'int16') {
        return `Int16Array`;
    }

    if (innerType.candidMeta.candidType === 'int8') {
        return `Int8Array`;
    }

    if (innerType.candidMeta.candidType === 'nat64') {
        return `BigUint64Array`;
    }

    if (innerType.candidMeta.candidType === 'nat32') {
        return `Uint32Array`;
    }

    if (innerType.candidMeta.candidType === 'nat16') {
        return `Uint16Array`;
    }

    if (innerType.candidMeta.candidType === 'nat8') {
        return `Uint8Array`;
    }

    return `(${innerType.candidMeta.typeAnnotation})[]`;
}
